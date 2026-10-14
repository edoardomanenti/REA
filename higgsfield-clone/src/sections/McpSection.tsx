import { LogoMark } from "../components/Logo";
import { mcpSection } from "../content/home";

const agentPositions = ["is-a", "is-b", "is-c", "is-d"] as const;

export function McpSection() {
  return (
    <a href="#" className="mcp-section">
      {mcpSection.agents.map((agent, i) => (
        <span className={`mcp-agent ${agentPositions[i] ?? ""}`} key={agent}>
          <span className="mcp-agent-label">{agent}</span>
          <span className="mcp-blob" aria-hidden="true">
            <span />
            <span />
          </span>
          <span className="mcp-cursor" aria-hidden="true">
            ➤
          </span>
        </span>
      ))}
      <h2 className="mcp-title display">
        {mcpSection.title[0]} <span className="mcp-cloud" aria-hidden="true" />{" "}
        {mcpSection.title[1]}
        <br />
        {mcpSection.title[2]}
      </h2>
      <p className="mcp-description">{mcpSection.description}</p>
      <span className="btn btn-primary btn-md">
        <LogoMark size={20} />
        {mcpSection.cta}
      </span>
    </a>
  );
}
