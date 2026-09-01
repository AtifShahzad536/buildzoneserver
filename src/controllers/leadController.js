import Lead from '../models/Lead.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';
import { sendLeadNotification } from '../config/mailer.js';

export const getAll = asyncHandler(async (req, res) => {
  const leads = await Lead.find().sort({ createdAt: -1 });
  return sendSuccess(res, leads, 'Leads retrieved');
});

export const getById = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  if (!lead) return sendError(res, 'Lead not found', 404);
  return sendSuccess(res, lead, 'Lead details');
});

export const create = asyncHandler(async (req, res) => {
  const newLead = await Lead.create({
    ...req.body,
    activities: [
      { type: 'Lead Created', note: `Inquiry received via ${req.body.source || 'Website'}` }
    ]
  });

  // Automatically dispatch instant Gmail notification in background
  sendLeadNotification(newLead).catch(err => {
    console.error('?? [Email Notification Non-blocking Warning]:', err.message);
  });

  return sendSuccess(res, newLead, 'Your inquiry has been received. Our engineering partners will connect within 24h.', 201);
});

export const update = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  if (!lead) return sendError(res, 'Lead not found', 404);

  if (req.body.status && req.body.status !== lead.status) {
    lead.activities.unshift({
      type: 'Status Changed',
      note: `Status changed from ${lead.status} to ${req.body.status}`
    });
  }

  if (req.body.newActivity) {
    lead.activities.unshift({
      type: req.body.newActivity.type || 'Note Added',
      note: req.body.newActivity.note
    });
  }

  Object.assign(lead, req.body);
  await lead.save();
  return sendSuccess(res, lead, 'Lead updated');
});

export const remove = asyncHandler(async (req, res) => {
  await Lead.findByIdAndDelete(req.params.id);
  return sendSuccess(res, { id: req.params.id }, 'Lead deleted');
});
