// The StepConfig interface defines the structure of each step in the process.
// Each step is represented by a key of type number.
// The value is an object with properties `title`, `next`, and `prev`.
export interface StepConfig {
  [key: number]: {
    title: string; // The title of the current step.
    next: number; // The number representing the next step in the process. `-1` indicates there is no next step.
    prev: number; // The number representing the previous step in the process. `-1` indicates there is no previous step.
  };
}

// The STEPS_CONFIG constant is an object that adheres to the StepConfig interface.
// It defines the steps in the process, with each key being a step number and the value being an object that describes the step, the next step, and the previous step.
export const STEPS_CONFIG: StepConfig = {
  // Step 0: The user chooses a template. There is no previous step, so `prev` is -1.
  0: {
    title: 'automation.choose-template',
    next: 1, // The next step is 1, where the user previews the email.
    prev: 7, // There is no previous step.
  },
  // Step 1: The user previews the email. The previous step is 0 (choosing a template), and the next step is 2 (editing the email).
  1: {
    title: 'automation.preview-email',
    next: 2, // The next step is 2, where the user edits the email.
    prev: 0, // The previous step is 0, where the user chose a template.
  },
  // Step 2: The user edits the email. The previous step is 1 (previewing the email). There is no next step, so `next` is -1.
  2: {
    title: 'automation.edit-email',
    next: -1, // There is no next step.
    prev: 1, // The previous step is 1, where the user previewed the email.
  },
  // Step 4: The user imports the email. The previous step is also 4, and the next step is 5 (editing the email).
  4: {
    title: 'automation.import-email',
    next: 5, // The next step is 5, where the user edits the email.
    prev: 7, // There is no previous step.
  },
  // Step 5: The user edits the email. The previous step is 4 (importing the email). There is no next step, so `next` is -1.
  5: {
    title: 'automation.edit-email',
    next: -1, // There is no next step.
    prev: 4, // The previous step is 4, where the user imported the email.
  },
  6: {
    title: 'automation.free-text',
    next: -1,
    prev: 7,
  },
  7: {
    title: 'automation.add-email-design',
    next: -1,
    prev: -1,
  },
};

export const EMAIL_TEMPLATE_TYPES = {
  FREE_TEXT: 'free_text',
  IMPORTED: 'imported',
  TEMPLATE: 'template',
};
