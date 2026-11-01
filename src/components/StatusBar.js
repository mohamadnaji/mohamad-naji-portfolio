import Icon from './Icon';
import { SECTION_FILES } from '../data/portfolio';
import { useSectionNav } from '../hooks/useSectionNav';
import { openTerminal, terminalShortcut } from './Terminal';

// IntelliJ-style status bar (desktop only). The line counter is updated by useScrollEffects.
export default function StatusBar() {
  const { active } = useSectionNav();
  const file = SECTION_FILES[active] || SECTION_FILES.home;
  const dir = file === 'pom.xml' ? 'mohamadnaji.dev ›' : 'mohamadnaji.dev › src › main › java ›';
  return (
    <div className="statusbar">
      <span className="sb-item"><Icon name="branch" />main</span>
      <span className="sb-item ok"><Icon name="check" />0 problems</span>
      <span className="sb-path">{dir} <b>{file}</b></span>
      <span className="sb-spacer" />
      <span className="sb-item" id="sbLn">Ln 1, Col 1</span>
      <span className="sb-item">UTF-8</span>
      <span className="sb-item">Java 21</span>
      <button className="sb-btn" type="button" onClick={openTerminal}>
        <span aria-hidden="true">&gt;_</span>Terminal <kbd>{terminalShortcut()}</kbd>
      </button>
    </div>
  );
}
