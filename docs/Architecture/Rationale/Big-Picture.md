# Big Picture

## The SwitchUp Architecture: System of Record, Process Orchestrator, and Capability Domains

At the highest level, our system is not a collection of services, but a layered architecture designed for clarity, stability, and coordinated action. It consists of three primary layers, each with a distinct responsibility and strict boundaries.

### 1. The System of Record: The /lifecycle Domain

- **What it is:** The single, authoritative source of truth for all core business data (Contracts, Users, Tasks). It is the foundation upon which all other layers depend.
- **Its Role:** It acts as **the guardian of business state**—conservative, transactional, and relentlessly consistent. Its primary job is to validate every operation and protect the integrity of the business's core data.
- **How it Works:** It exposes a granular, intent-driven API called the **Business Intent Catalog**. These are the atomic "verbs" of the business (ConfirmActivation, ApplyCredit). It guarantees that no action can be taken that would violate the core rules of the business's state. It also provides rich, temporal **Projection** queries that allow other layers to understand an entity's past, present, and deterministic future.
- **The Golden Rule:** It calls no one. Everyone calls it for the truth.

### 2. The Capability Domains: The Specialized Tool Layers

- **What they are:** A collection of independent, specialized, and stateless capability providers.
  - **/provider/:** The expert on interacting with energy providers.
  - **/service/:** The expert on user and agent interaction.
  - **/offer/:** The expert on modeling the market.
  - **/optimisation/:** The expert on making optimal choices.
  - **/growth/:** The expert on user acquisition.
- **Their Role:** They are **specialized experts**. Each one is a master of its own domain. /provider knows everything about Vattenfall's API but nothing about user experience. /service knows everything about user intents but nothing about provider APIs.
- **How they Work:** They provide a library of reusable, stateless **Capabilities**. They are forbidden from talking to each other directly. To perform their work, they query the **System of Record** (/lifecycle) for the state of the world.
- **The Golden Rule:** A Capability Domain only performs its specialized function. It never orchestrates a multi-domain process.

### 3. The Process Orchestrator: The /case Domain

- **What it is:** The single, centralized orchestrator for all end-to-end business processes.
- **Its Role:** It acts as **the director of operations**. It doesn't have deep specialized knowledge, but it is the only layer that understands the complete "story" of how to achieve a business goal.
- **How it Works:** Its capabilities are **Flows** (the "Playbooks" and "Agents"). These flows do not contain complex logic themselves. Instead, they are a sequence of calls that **coordinate** the Capability Domains and direct the System of Record. A handle-price-increase Flow tells /optimisation to analyze, /service to communicate, and /lifecycle to record the final decision.
- **The Golden Rule:** It is the only layer allowed to make calls across multiple Capability Domains to execute a process. It is the single source of truth for all business process logic.

### How It All Ties Together: The Flow of Work

This architecture creates a clean, top-down flow of coordination for every action.

1. **A Trigger Occurs:** An external event (like a user click or a provider email) is received by a dedicated **Ingestion Flow** in the /case domain.
2. **The Orchestrator Activates:** The Ingestion Flow interprets the trigger and invokes the **Process Dispatcher** (the Meta Router), a central capability within the Process Orchestrator.
3. **A Strategy is Chosen:** The Dispatcher consults its **Routing Configuration** (the "Process Manifest") to decide which specific version of the business process to run (e.g., the stable _playbook_v1 or the experimental _agent_v1). This is the heart of the system's agility and allows for A/B testing of entire business processes.
4. **The Orchestrator Coordinates the Capability Domains:** The chosen implementation Flow (the "Playbook" or "Agent") executes. It makes a series of calls to the specialized Capability Domains to gather information, make decisions, and interact with the world.
   - *"Hey /offer, what's on the market?"*
   - *"Hey /optimisation, what's the best choice?"*
   - *"Hey /provider, execute this cancellation."*
5. **The System of Record Commits the Truth:** As the final step of any significant action, the Process Orchestrator (/case) issues a precise, atomic **Command** from the Business Intent Catalog to the System of Record (/lifecycle). The System of Record validates and records the state change, creating an immutable, auditable record of the action.
6. **The System Reacts (Optional):** The System of Record emits a "Lean State Transition" **Event**. This allows decoupled "sidecar" processes (like analytics or non-critical notifications) to react to the change without being part of the core orchestration.

### The Strategic Advantages of This Model

This architecture is not just a technical choice; it is a business strategy.

- **Clarity:** The business processes are explicit, readable artifacts, not hidden in code.
- **Agility:** The system is built for experimentation. New strategies and AI agents can be safely tested and deployed via configuration, without risky code changes.
- **Resilience:** The clean separation of concerns and strict communication rules dramatically reduce the "blast radius" of failures.
- **Scalability (Human & Technical):** It allows teams to work autonomously within their domains of expertise without creating system-wide dependencies.
- **AI-Readiness:** It provides a perfect, three-tiered "Cognitive Stack" of tools (Processes, Capabilities, and Commands) that allows an AI agent to operate safely and effectively.

In essence, we have moved from building a simple application to building an **intelligent, evolvable, and resilient operational platform.** This is the definitive big-picture vision.

