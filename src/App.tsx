import './App.css'

function App() {
  const serviceCategories = [
    {
      title: '3Dプリント / STL作成',
      icon: '🛠️',
      details: [
        '手描き図・寸法メモ・写真からのSTLデータ作成',
        '収納フック、ホルダー、アダプタ等の小物パーツ設計',
        '3Dプリンター周辺パーツ・治具の設計',
        'OpenSCADによるパラメトリック設計',
        '印刷しやすい形状への最適化（角丸、肉抜き、補強など）'
      ]
    },
    {
      title: 'Minecraft / ゲーム開発',
      icon: '⛏️',
      details: [
        'Java Edition / Fabric環境向けMod開発',
        'ゲーム内UI / HUD / ミニマップの実装',
        'サーバー・クライアント間の同期処理設計',
        '描画処理、データ処理の高度なカスタマイズ',
        'Mod開発環境の構築支援'
      ]
    },
    {
      title: 'バックエンド / 自動化',
      icon: '⚙️',
      details: [
        'Python / Go / Java による業務ツール・バッチ開発',
        'Google Apps Scriptによる業務効率化',
        'Web API連携、データ同期処理の構築',
        'CLIツールの開発',
        '小規模Webアプリのバックエンド構築'
      ]
    },
    {
      title: 'AI活用 / 開発支援',
      icon: '🤖',
      details: [
        'ChatGPT / Claude Code / Gemini CLIを活用した開発効率化',
        'AIエージェントの試作、プロンプト設計',
        'AIを活用した設計補助・コード生成フローの構築',
        '調査・ドキュメント作成の自動化支援'
      ]
    }
  ];

  const languages = ['Rust', 'C++', 'Go', 'Java', 'Python', 'TypeScript', 'GAS'];
  const technologies = [
    'Minecraft Fabric', 'OpenSCAD', 'STL', '3D Printing', 
    'Bambu Lab', 'Fusion 360', 'Web API', 'LLM (ChatGPT/Claude/Gemini)',
    'Reverse Engineering', 'System Programming', 'FPGA'
  ];

  return (
    <div className="container">
      <header className="hero">
        <div className="hero-content">
          <p className="subtitle">Freelance Developer</p>
          <h1>井野 幸一</h1>
          <p className="description">
            3Dプリント用STL作成 / Minecraft Fabric Mod開発 / バックエンド開発 / AI活用
          </p>
          <div className="hero-tags">
            <span>#Rust</span><span>#Cpp</span><span>#Go</span><span>#Java</span><span>#Python</span>
          </div>
        </div>
      </header>

      <section id="about">
        <h2>はじめまして</h2>
        <div className="about-grid">
          <div className="about-text">
            <p>
              フリーランス開発者として、実用的なツール制作からシステム設計、3Dプリント用パーツ設計まで幅広く対応しています。
              主に <strong>Rust / C++ / Go / Java / Python</strong> を得意としており、低レイヤー技術、システムプログラミング、AI/LLM活用に関心があります。
            </p>
            <p>
              「アイデアはあるけど形にできない」「手作業を自動化したい」「既存品では合わないパーツを作りたい」といった段階から、
              目的に合わせて仕様を整理し、実際に使える形へと落とし込むことを得意としています。
            </p>
          </div>
        </div>
      </section>

      <section id="services">
        <h2>対応分野</h2>
        <div className="services-grid">
          {serviceCategories.map((cat, i) => (
            <div key={i} className="service-card">
              <div className="service-icon">{cat.icon}</div>
              <h3>{cat.title}</h3>
              <ul>
                {cat.details.map((detail, j) => (
                  <li key={j}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="strengths">
        <h2>得意なこと / 強み</h2>
        <div className="strengths-container">
          <div className="strength-item">
            <h4>具現化力</h4>
            <p>曖昧なアイデアや手描きメモから、実用的な設計・実装へ落とし込みます。</p>
          </div>
          <div className="strength-item">
            <h4>実用設計</h4>
            <p>3Dプリントの特性を理解した、壊れにくく印刷しやすい形状設計。</p>
          </div>
          <div className="strength-item">
            <h4>技術適応力</h4>
            <p>新しい技術（AIツール、低レイヤー技術等）を短期間で習得し、業務に活用します。</p>
          </div>
          <div className="strength-item">
            <h4>効率化</h4>
            <p>複数AIツールの組み合わせや自動化スクリプトによる、徹底した開発フローの構築。</p>
          </div>
        </div>
      </section>

      <section id="skills">
        <h2>Skills & Technologies</h2>
        <div className="skills-block">
          <h3>Languages</h3>
          <div className="tag-cloud">
            {languages.map(lang => <span key={lang} className="tag lang-tag">{lang}</span>)}
          </div>
          <h3>Tools & Domains</h3>
          <div className="tag-cloud">
            {technologies.map(tech => <span key={tech} className="tag tech-tag">{tech}</span>)}
          </div>
        </div>
      </section>

      <section id="low-layer">
        <h2>研究・関心分野</h2>
        <div className="interest-card">
          <p>
            リバースエンジニアリング、バイナリ解析、FPGA、PCIe、DMAなど、ハードウェアに近い低レイヤー技術に強い関心を持ち、検証を行っています。
            また、ドローン（VTOL）やYOLOを用いた物体検出など、ハードウェアとソフトが交差する領域での技術検証にも取り組んでいます。
          </p>
        </div>
      </section>

      <section id="gallery">
        <h2>Gallery / Works</h2>
        <div className="gallery-grid">
          <div className="gallery-item">
            <img src="./projects/sample1.png" alt="Work 1" />
          </div>
          <div className="gallery-item">
            <img src="./projects/sample2.png" alt="Work 2" />
          </div>
          <div className="gallery-item">
            <img src="./projects/sample3.png" alt="Work 3" />
          </div>
          <div className="gallery-item">
            <img src="./projects/sample4.png" alt="Work 4" />
          </div>
        </div>
      </section>

      <section id="contact">
        <h2>Contact</h2>
        <div className="contact-box">
          <p>「こんなものは作れるか？」「この作業を自動化したい」といったご相談をお待ちしております。</p>
          <div className="contact-links">
            <a href="https://github.com/Rangesa" target="_blank" rel="noopener noreferrer" className="contact-btn">GitHub</a>
            <a href="mailto:example@example.com" className="contact-btn email-btn">お問い合わせ (Email)</a>
          </div>
        </div>
      </section>

      <footer>
        <p>&copy; 2026 Koichi Ino. Built with React & Vite & Gemini CLI.</p>
      </footer>
    </div>
  )
}

export default App
