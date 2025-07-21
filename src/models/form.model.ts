import mongoose, { Document, Schema } from "mongoose";
import { FormSchema } from "@formai/types";

export interface IForm extends Document {
	userId: mongoose.Types.ObjectId;
	prompt: string;
	history: FormSchema[];
	revisionHistory: {
		prompt: string;
		revisedAt: Date;
	}[];
	googleFormUrl?: string;
	createdAt: Date;
	updatedAt: Date;
}

const FormSchema: Schema = new Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
		prompt: { type: String, required: true },
		history: { type: [Schema.Types.Mixed], required: true },
		revisionHistory: [
			{
				prompt: { type: String, required: true },
				revisedAt: { type: Date, default: Date.now },
			},
		],
		googleFormUrl: { type: String },
	},
	{ timestamps: true }
);

export default mongoose.model<IForm>("Form", FormSchema);
