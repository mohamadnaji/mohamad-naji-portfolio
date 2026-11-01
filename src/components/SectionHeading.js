import { Fragment } from 'react';

// Renders a Spring-style annotation label, e.g. annotation('Service', 'services') -> @Service("services")
export function annotation(name, arg) {
  return (
    <>
      <span className="a">@{name}</span>
      {arg !== undefined && <>(<span className="s">&quot;{arg}&quot;</span>)</>}
    </>
  );
}

// Section header: mono eyebrow, a title whose words rise in on reveal, and an optional aside.
export default function SectionHeading({ eyebrow, title, children }) {
  const words = title.split(' ');
  return (
    <div className="sh">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="split" aria-label={title}>
          {words.map((w, i) => (
            <Fragment key={`${w}-${i}`}>
              {i > 0 && ' '}
              <span className="w" aria-hidden="true"><span style={{ transitionDelay: `${i * 0.05}s` }}>{w}</span></span>
            </Fragment>
          ))}
        </h2>
      </div>
      {children}
    </div>
  );
}
