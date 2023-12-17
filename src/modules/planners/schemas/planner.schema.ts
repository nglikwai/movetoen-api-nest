/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { Document } from 'mongoose';

import { Trip } from '@modules/trips/schemas/trip.schema';

export type PlannerDocument = Planner & Document;
// @Schema()
// export class Item {
//   @Prop({ type: String })
//   title: string;

//   @Prop({ type: String })
//   type: string;
// }

const Item = {
  title: { type: String },
  type: { type: String },
};

// @Schema()
// export class SpotPlan {
//   @Prop({ type: String })
//   _id: string;

//   @Prop({ type: String })
//   time: string;

//   @Prop({ type: String })
//   location: string;

//   @Prop({ type: String })
//   description: string;

//   @Prop({ type: [Item] })
//   items: Item[];
// }

const SpotPlan = {
  _id: { type: String },
  start_time: { type: String },
  end_time: { type: String },
  location: { type: String },
  description: { type: String },
  images: { type: [String] },
  items: [Item],
};

// @Schema()
// export class DayPlan {
//   @Prop({ type: String })
//   day: string;

//   @Prop({ type: [SpotPlan] })
//   spotPlans: SpotPlan[];
// }

const DayPlan = {
  day: { type: String },
  spotPlans: { type: [SpotPlan] },
};

@Schema({
  toObject: {
    virtuals: true,
  },
  timestamps: true,
  versionKey: false,
})
export class Planner {
  @Prop({
    type: String,
    default: 'New Planner',
  })
  title: string;

  @Prop({ type: [DayPlan] })
  tripPlan: (typeof DayPlan)[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Trip.name })
  tripId: mongoose.Types.ObjectId;
}

export const PlannerSchema = SchemaFactory.createForClass(Planner);
