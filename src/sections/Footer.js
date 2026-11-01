import Icon from '../components/Icon';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          <div>
            <p className="sig">Crafted with <span className="heart" role="img" aria-label="love"><Icon name="heart" /></span> by <b>Mohamad Naji</b></p>
            <p className="tagline">Building digital experiences that make a difference</p>
          </div>
          <div className="socials">
            <a href="https://github.com/mohamadnaji" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Icon name="github" /></a>
            <a href="https://linkedin.com/in/mohamad-naji-b84310174" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Icon name="linkedin" /></a>
          </div>
        </div>
        <p className="copyright">© {new Date().getFullYear()} Mohamad Naji. All rights reserved.</p>
      </div>
    </footer>
  );
}
