import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { CommentsSchema } from '../models/Comment';
import { EventSchema } from '../models/Event';
import { TicketSchema } from '../models/Ticket';
import { ValueSchema } from '../models/Value'


class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Tickets = mongoose.model('Ticket', TicketSchema)

  Events = mongoose.model('Event', EventSchema);

  Comments = mongoose.model('comments', CommentsSchema)
}

export const dbContext = new DbContext()
