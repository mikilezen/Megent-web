export const FAQS = [
  {
    question: "What does Megent check?",
    answer:
      "Megent evaluates calls to the Python tool functions you guard. It applies the configured policy before the wrapped function runs. Coverage depends on which functions your agent routes through Megent.",
  },
  {
    question: "Does Megent replace my agent framework?",
    answer:
      "No. Megent is a Python runtime layer you add around the tools or execution functions you want to protect. Check your framework's call path and make sure the relevant tool boundary is wrapped.",
  },
  {
    question: "Can Megent mask sensitive values?",
    answer:
      "The runtime supports configurable pattern-based masking for fields such as email addresses and phone numbers. Define the fields in your policy and review the behavior against your own data before using it in production.",
  },
  {
    question: "Does Megent protect every part of an AI system?",
    answer:
      "No. Megent focuses on policy checks around guarded tool calls. Prompt injection, model output, secrets in prompts, and the tools themselves need their own security controls.",
  },
  {
    question: "Where does Megent run?",
    answer:
      "Megent is an open-source Python package that runs with your application. The project is Apache-2.0 licensed. See the repository for current setup instructions and implementation details.",
  },
];
