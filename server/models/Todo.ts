import mongoose, { Document, Schema } from 'mongoose';

interface Todo extends Document {
  userID: string;
  task: string;
  doing: boolean;
  done: boolean;
}

const TodoSchema = new Schema<Todo>({
  userID: { type: String, required: true },
  task: { type: String, required: true },
  doing: {
    type: Boolean,
    default: false
  },
  done: {
    type: Boolean,
    default: false
  }
});

const TodoModel = mongoose.model<Todo>('Todo', TodoSchema);

export default TodoModel;
