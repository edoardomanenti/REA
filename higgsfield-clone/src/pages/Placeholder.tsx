import { Link, useLocation } from "react-router-dom";

// Routes the clone does not rebuild yet land here instead of a blank page.
export function Placeholder() {
  const { pathname } = useLocation();
  return (
    <main className="placeholder-page">
      <p className="placeholder-path">{pathname}</p>
      <h1 className="display">Coming soon</h1>
      <p className="text-muted">
        This page is not part of the clone yet. Image and Video studios are
        ready.
      </p>
      <div className="placeholder-actions">
        <Link to="/ai/image" className="btn btn-primary btn-md">
          Open Image
        </Link>
        <Link to="/ai/video" className="btn btn-white btn-md">
          Open Video
        </Link>
      </div>
    </main>
  );
}
