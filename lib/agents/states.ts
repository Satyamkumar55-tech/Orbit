// lib/agents/state.ts

// export interface GraphState {

//   startupName: string

//   idea: string

//   startupAdvisor: string

//   marketResearch: string

//   productManager: string

//   softwareArchitect: string

//   engineeringManager: string

//   marketingAgent: string

//   roadmap: string[]

// }


import { Annotation } from "@langchain/langgraph";

export const GraphState = Annotation.Root({

  startupName: Annotation<string>(),

  idea: Annotation<string>(),

  startupAdvisor: Annotation<string>(),

  marketResearch: Annotation<string>(),

  productManager: Annotation<string>(),

  softwareArchitect: Annotation<string>(),

  engineeringManager: Annotation<string>(),

  marketingAgent: Annotation<string>(),

  roadmap: Annotation<string[]>()

});