import mongoose from 'mongoose';
import Lead from '../models/Lead.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';
import { sendLeadNotification } from '../config/mailer.js';

export const getAll = asyncHandler(async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    const leads = await Lead.find().sort({ createdAt: -1 });
    return sendSuccess(res, leads, 'Leads retrieved');
  }
  return sendSuccess(res, [], 'Database offline. No remote leads retrieved.');
});

export const getById = asyncHandler(async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return sendError(res, 'Lead not found', 404);
    return sendSuccess(res, lead, 'Lead details');
  }
  return sendError(res, 'Database offline', 503);
});

export const create = asyncHandler(async (req, res) => {
  let newLead = {
    ...req.body,
    _id: `lead-${Date.now()}`,
    id: `lead-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  // 1. Try persisting to MongoDB if database connection is active
  if (mongoose.connection.readyState === 1) {
    try {
      newLead = await Lead.create({
        ...req.body,
        activities: [
          { type: 'Lead Created', note: `Inquiry received via ${req.body.source || 'Website'}` }
        ]
      });
    } catch (dbErr) {
      console.warn("?? [Lead DB Persistence Notice]:", dbErr.message);
    }
  }

  // 2. Dispatch instant Gmail notification to Admin (ALWAYS triggered)
  try {
    await sendLeadNotification(req.body);
  } catch (err) {
    console.error('?? [Lead Email Notification Error]:', err.message);
  }

  return sendSuccess(res, newLead, 'Your inquiry has been received. Our engineering partners will connect within 24h.', 201);
});

export const update = asyncHandler(async (req, res) => {
  if (mongoose.connection.readyState === 1) {
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
  }
  return sendSuccess(res, req.body, 'Lead updated locally');
});

export const remove = asyncHandler(async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    await Lead.findByIdAndDelete(req.params.id);
  }
  return sendSuccess(res, { id: req.params.id }, 'Lead deleted');
});
