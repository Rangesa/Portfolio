import './App.css'

function App() {
  const projects = [
    { title: 'Project 1', description: 'ReactとTypeScriptを使用したWebアプリケーション。', tech: ['React', 'TypeScript', 'Vite'] },
    { title: 'Project 2', description: 'Node.jsを使用したバックエンドAPIサービス。', tech: ['Node.js', 'Express', 'MongoDB'] },
    { title: 'Project 3', description: 'Pythonによるデータ分析ツール。', tech: ['Python', 'Pandas', 'Matplotlib'] },
  ];

  const skills = ['React', 'TypeScript', 'Node.js', 'Python', 'Git', 'CSS/HTML'];

  return (
    <div className="container">
      <header>
        <h1>Welcome to My Portfolio</h1>
        <p>ソフトウェアエンジニア / クリエイター</p>
      </header>

      <section id="about">
        <h2>About Me</h2>
        <div className="about-content">
          <p>
            こんにちは！私は技術で新しい価値を創造することに情熱を持っているエンジニアです。
            モダンなウェブ技術を中心に、使いやすく美しいプロダクトの開発を目指しています。
          </p>
        </div>
      </section>

      <section id="skills">
        <h2>Skills</h2>
        <ul className="skills-list">
          {skills.map((skill) => (
            <li key={skill} className="skill-item">{skill}</li>
          ))}
        </ul>
      </section>

      <section id="projects">
        <h2>Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="skills-list">
                {project.tech.map((t) => (
                  <span key={t} className="skill-item" style={{ fontSize: '0.7rem' }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact">
        <h2>Contact</h2>
        <p>お気軽にご連絡ください！</p>
        <p>Email: example@example.com</p>
        <p>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a> | 
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"> Twitter</a>
        </p>
      </section>

      <footer>
        <p>&copy; 2026 My Portfolio Site. Built with React & Vite.</p>
      </footer>
    </div>
  )
}

export default App
