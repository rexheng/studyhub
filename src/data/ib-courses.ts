export const ibCourses = [
  {
    track: {
      title: "Investment Banking Technical Interview Mastery",
      description: "Comprehensive technical preparation for investment banking interviews based on BIWS methodology",
      slug: "ib-technical-interview",
      modules: [
        {
          title: "Finance Fundamentals",
          description: "Core finance concepts including time value of money, NPV, and IRR",
          order: 1,
          slug: "finance-fundamentals",
          lessons: [
            {
              title: "Time Value of Money & Discount Rates",
              slug: "time-value-money",
              order: 1,
              content: "# Time Value of Money & Discount Rates...",
              questions: [
                {
                  text: "Why is money today worth more than money tomorrow?",
                  type: "multiple_choice",
                  difficulty: "easy",
                  options: [
                    { text: "Because you could invest it today and earn returns", isCorrect: true, explanation: "Correct! Money today can be invested to generate returns, making it worth more than the same amount in the future." },
                    { text: "Because of inflation only", isCorrect: false, explanation: "Inflation is one factor, but the main reason is the opportunity to invest and earn returns." },
                    { text: "Because banks charge interest", isCorrect: false, explanation: "This relates to borrowing costs, not the fundamental time value principle." },
                    { text: "Because of tax implications", isCorrect: false, explanation: "Taxes affect returns but aren't the core reason for time value of money." }
                  ]
                },
                {
                  text: "If an investment has an IRR of 15% and your discount rate is 12%, should you invest?",
                  type: "multiple_choice",
                  difficulty: "medium",
                  options: [
                    { text: "Yes, because IRR > Discount Rate", isCorrect: true, explanation: "Correct! When IRR exceeds the discount rate, the investment is expected to generate returns above your required threshold." },
                    { text: "No, because the IRR is too high", isCorrect: false, explanation: "A higher IRR is favourable, not a reason to reject the investment." },
                    { text: "Need more information", isCorrect: false, explanation: "The IRR vs discount rate comparison is sufficient for the investment decision." },
                    { text: "No, because 15% is risky", isCorrect: false, explanation: "The discount rate already accounts for risk; IRR > discount rate means invest." }
                  ]
                }
              ]
            },
            {
              title: "NPV and IRR Analysis",
              slug: "npv-irr-analysis",
              order: 2,
              content: "# NPV and IRR Analysis...",
              questions: [
                {
                  text: "What does a positive NPV indicate?",
                  type: "multiple_choice",
                  difficulty: "easy",
                  options: [
                    { text: "The investment creates value and should be pursued", isCorrect: true, explanation: "Correct! Positive NPV means the present value of future cash flows exceeds the initial investment." },
                    { text: "The investment is too risky", isCorrect: false, explanation: "NPV already accounts for risk through the discount rate." },
                    { text: "The IRR is negative", isCorrect: false, explanation: "Positive NPV actually means IRR > discount rate." },
                    { text: "The payback period is too long", isCorrect: false, explanation: "NPV considers all cash flows regardless of timing; positive NPV is favourable." }
                  ]
                },
                {
                  text: "IRR represents:",
                  type: "multiple_choice",
                  difficulty: "medium",
                  options: [
                    { text: "The annualised return expected from this specific investment", isCorrect: true, explanation: "Correct! IRR is the compound annual growth rate of the investment." },
                    { text: "The market risk premium", isCorrect: false, explanation: "Market risk premium is a component of cost of equity, not IRR." },
                    { text: "The company's cost of debt", isCorrect: false, explanation: "Cost of debt is a financing cost, not the investment's return." },
                    { text: "The risk-free rate", isCorrect: false, explanation: "Risk-free rate is a benchmark rate, not specific to this investment." }
                  ]
                }
              ]
            }
          ]
        },
        {
            title: "Financial Statements",
            description: "Understanding the three core financial statements and their interconnections",
            order: 2,
            slug: "financial-statements",
            lessons: [
              {
                title: "Balance Sheet Fundamentals",
                slug: "balance-sheet",
                order: 1,
                content: "# Balance Sheet Fundamentals...",
                questions: [
                  {
                    text: "What does the Balance Sheet show?",
                    type: "multiple_choice",
                    difficulty: "easy",
                    options: [
                      { text: "A snapshot of assets, liabilities and equity at a point in time", isCorrect: true, explanation: "Correct! The Balance Sheet shows the company's financial position at a specific moment." },
                      { text: "Revenue and expenses over a period", isCorrect: false, explanation: "This describes the Income Statement, not the Balance Sheet." },
                      { text: "Cash inflows and outflows", isCorrect: false, explanation: "This describes the Cash Flow Statement." },
                      { text: "Only the company's debt levels", isCorrect: false, explanation: "The Balance Sheet shows all assets, liabilities, and equity, not just debt." }
                    ]
                  },
                  {
                    text: "Which of these is a current asset?",
                    type: "multiple_choice",
                    difficulty: "medium",
                    options: [
                      { text: "Inventory", isCorrect: true, explanation: "Correct! Inventory is a current asset expected to be sold within one year." },
                      { text: "Goodwill", isCorrect: false, explanation: "Goodwill is a long-term intangible asset." },
                      { text: "Long-term debt", isCorrect: false, explanation: "This is a liability, not an asset." },
                      { text: "Net PP&E", isCorrect: false, explanation: "Property, Plant & Equipment is a non-current asset." }
                    ]
                  }
                ]
              }
            ]
        }
      ]
    }
  },
  {
    track: {
      title: "Complete Investment Banking Interview Mastery",
      description: "Comprehensive technical and behavioral interview preparation for investment banking roles",
      slug: "complete-ib-interview-mastery",
      modules: [
        {
          title: "Behavioral Interview Excellence",
          description: "Master the behavioral and fit questions in investment banking interviews",
          order: 5,
          slug: "behavioral-interview",
          lessons: [
            {
              title: "Why Investment Banking",
              slug: "why-investment-banking",
              order: 1,
              content: "# Why Investment Banking?...",
              questions: [
                {
                  text: "What's the biggest mistake in answering 'Why Investment Banking?'",
                  type: "multiple_choice",
                  difficulty: "easy",
                  options: [
                    { text: "Focusing primarily on money or exit opportunities", isCorrect: true, explanation: "Correct! These answers suggest you're not committed to the role itself." },
                    { text: "Mentioning specific deals", isCorrect: false, explanation: "Specific deals show genuine interest and research." },
                    { text: "Discussing the long hours", isCorrect: false, explanation: "Acknowledging challenges shows realistic expectations." },
                    { text: "Connecting to your background", isCorrect: false, explanation: "This is essential to show fit and preparation." }
                  ]
                },
                {
                  text: "How should you address lack of IB experience?",
                  type: "multiple_choice",
                  difficulty: "medium",
                  options: [
                    { text: "Show transferable skills and demonstrate preparation efforts", isCorrect: true, explanation: "Correct! Focus on relevant skills you've developed and steps taken to prepare." },
                    { text: "Apologise for the gap", isCorrect: false, explanation: "Don't apologise; confidently explain your path and preparation." },
                    { text: "Say experience doesn't matter", isCorrect: false, explanation: "Acknowledge the gap but show how you bridge it." },
                    { text: "Change the subject", isCorrect: false, explanation: "Address concerns directly and confidently." }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  }
];
