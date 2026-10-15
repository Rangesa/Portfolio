import { useEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import './App.css'

type PanelKey = 'home' | 'works' | 'about' | 'research' | 'contact'
type Category = 'all' | 'ai' | 'minecraft' | 'tools'
type IconName = 'pc' | 'folder' | 'file' | 'terminal' | 'globe' | 'mail' | 'chip' | 'info' | 'drive' | 'code'
type PanelState = { open: boolean; minimized: boolean; maximized: boolean; x: number; y: number; z: number }
type Project = {
  id: string
  name: string
  category: Exclude<Category, 'all'>
  kind: string
  line: string
  description: string
  highlights: string[]
  stack: string[]
  url: string
  icon: IconName
}

const github = 'https://github.com/Rangesa'
const projects: Project[] = [
  {
    id: 'wynn',
    name: 'Wynncraft AI Bridge',
    category: 'ai',
    kind: 'MCP / Fabric Mod',
    line: 'Minecraftの内部状態をAIへ、構造化して渡す。',
    description: '画面OCRに依存せず、Wynncraftの会話・インベントリ・アイテム情報などをMCPとREST経由でAIへ連携するFabric Mod。公式データ索引や日本語翻訳も扱います。',
    highlights: ['MCP / REST APIによる状態取得', '公式API・Wikiの知識検索', '会話・ツールチップの日本語化'],
    stack: ['Java', 'Fabric', 'MCP', 'REST', 'DeepL'],
    url: github + '/Wynncraft-AI-Bridge',
    icon: 'chip',
  },
  {
    id: 'danmaku',
    name: 'DanmakuChat',
    category: 'minecraft',
    kind: 'Minecraft Mod',
    line: 'チャットを、画面を流れる弾幕に。',
    description: 'Minecraftの標準チャットを、ニコニコ動画風のスクロール表示へ置き換えるクライアントMod。描画レーンや速度、メッセージフィルターなどを調整できます。',
    highlights: ['右から左へ流れるチャット表示', '重なりを抑えるレーン制御', '速度・透明度・フィルター設定'],
    stack: ['Java', 'Fabric', 'Client UI'],
    url: github + '/Danmaku-Chat',
    icon: 'file',
  },
  {
    id: 'decompiler',
    name: '.NET Decompiler MCP',
    category: 'ai',
    kind: 'Developer Tool',
    line: 'AIエージェントから.NETの内部構造へ。',
    description: 'Claude CodeなどのAIツールから.NETアセンブリを解析できるMCPサーバー。Steamゲームの検出、型の検査、メソッドのデコンパイルを支援します。',
    highlights: ['Steamライブラリ・アセンブリ検出', '型・メソッドの構造解析', 'ilspycmdによるデコンパイル'],
    stack: ['Python', '.NET', 'MCP', 'ILSpy'],
    url: github + '/dotnet-decompiler-mcp',
    icon: 'terminal',
  },
  {
    id: 'game-translator',
    name: 'Game Translator',
    category: 'tools',
    kind: 'Windows Application',
    line: 'ゲームの英文を、プレイ画面の上で翻訳。',
    description: 'Windows OCRでゲーム画面から文字を認識し、翻訳結果をDirect2Dのオーバーレイに表示するWindows向けツール。DeepL、Groq、ローカルLLMに対応する設計です。',
    highlights: ['Windows OCRによる文字認識', 'Direct2Dのオーバーレイ表示', '複数の翻訳エンジンを選択可能'],
    stack: ['Rust', 'Windows OCR', 'Direct2D', 'LLM'],
    url: github + '/Game-Translator',
    icon: 'globe',
  },
  {
    id: 'map',
    name: 'FastFastMap',
    category: 'minecraft',
    kind: 'Minecraft Mod',
    line: '軽量で、滑らかな地図を作る。',
    description: 'Minecraft用のミニマップと全画面マップ。タイルによる段階的表示、非同期処理、GPU側のLRU管理、訪問済みチャンクの永続化を設計しています。',
    highlights: ['Slippy Map方式のズーム', '非同期タイル描画', 'ワールドごとのチャンクキャッシュ'],
    stack: ['Java', 'Fabric', 'Rendering', 'Caching'],
    url: github + '/fastfastmap',
    icon: 'folder',
  },
]

const panelInfo: Record<PanelKey, { title: string; icon: IconName }> = {
  home: { title: 'Taryou - ようこそ', icon: 'pc' },
  works: { title: '制作物 - エクスプローラー', icon: 'folder' },
  about: { title: 'ABOUT.TXT - メモ帳', icon: 'file' },
  research: { title: '研究ノート - エクスプローラー', icon: 'drive' },
  contact: { title: '連絡先 - アドレス帳', icon: 'mail' },
}

const panels: PanelKey[] = ['home', 'works', 'about', 'research', 'contact']
const initialWindows: Record<PanelKey, PanelState> = {
  home: { open: true, minimized: false, maximized: false, x: 166, y: 46, z: 10 },
  works: { open: false, minimized: false, maximized: false, x: 205, y: 90, z: 11 },
  about: { open: false, minimized: false, maximized: false, x: 240, y: 120, z: 12 },
  research: { open: false, minimized: false, maximized: false, x: 226, y: 95, z: 13 },
  contact: { open: false, minimized: false, maximized: false, x: 260, y: 128, z: 14 },
}

function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  const outline = '#24304d'
  const shine = '#fff'
  const blue = '#294b92'
  const gold = '#f6c44f'
  let art
  switch (name) {
    case 'pc':
      art = <><rect x="3" y="2" width="24" height="20" fill={shine} stroke={outline} strokeWidth="2"/><rect x="6" y="5" width="18" height="13" fill="#009b9b"/><path d="M9 25h12l3 5H6z" fill="#c3c5cb" stroke={outline} strokeWidth="2"/><rect x="13" y="22" width="4" height="4" fill={outline}/></>
      break
    case 'folder':
      art = <><path d="M2 8V5h11l4 4h13v19H2z" fill="#d69d2b" stroke={outline} strokeWidth="2"/><path d="M3 12h27l-4 15H2z" fill={gold} stroke={outline} strokeWidth="2"/><path d="M5 15h20" stroke="#ffe8a5" strokeWidth="2"/></>
      break
    case 'file':
      art = <><path d="M6 2h14l7 7v21H6z" fill={shine} stroke={outline} strokeWidth="2"/><path d="M20 2v8h7" fill="#cbced6" stroke={outline} strokeWidth="2"/><path d="M10 15h13M10 20h13M10 25h9" stroke={blue} strokeWidth="2"/></>
      break
    case 'terminal':
      art = <><rect x="2" y="4" width="28" height="23" fill={outline} stroke="#d0d2d8" strokeWidth="2"/><path d="m7 11 5 4-5 4M16 20h9" fill="none" stroke="#73e2ac" strokeWidth="2"/><rect x="4" y="5" width="24" height="3" fill={blue}/></>
      break
    case 'globe':
      art = <><circle cx="16" cy="16" r="13" fill="#418ac8" stroke={outline} strokeWidth="2"/><path d="M6 10 12 8l3 5-4 5-5-2m10-11 2 6 7 2-2 8-7 4-3-7" fill="#88c36c"/><path d="M3 16h26M16 3c-5 6-5 20 0 26M16 3c5 6 5 20 0 26" fill="none" stroke="#e4f7fb" strokeWidth="1"/></>
      break
    case 'mail':
      art = <><rect x="2" y="7" width="28" height="19" fill="#fdfdfd" stroke={outline} strokeWidth="2"/><path d="m3 9 13 10L29 9" fill="none" stroke={blue} strokeWidth="2"/><path d="m3 25 10-9m16 9-10-9" stroke="#8995ab" strokeWidth="1.5"/></>
      break
    case 'chip':
      art = <><rect x="7" y="7" width="18" height="18" fill="#354a75" stroke={outline} strokeWidth="2"/><rect x="11" y="11" width="10" height="10" fill="#70c5b3"/><path d="M11 2v5M17 2v5M23 2v5M11 25v5M17 25v5M23 25v5M2 11h5M2 17h5M2 23h5M25 11h5M25 17h5M25 23h5" stroke={gold} strokeWidth="2"/></>
      break
    case 'info':
      art = <><circle cx="16" cy="16" r="13" fill="#3c68ac" stroke={shine} strokeWidth="2"/><rect x="14" y="13" width="4" height="11" fill={shine}/><rect x="14" y="7" width="4" height="4" fill={shine}/></>
      break
    case 'drive':
      art = <><rect x="3" y="8" width="26" height="18" fill="#c3c4ca" stroke={outline} strokeWidth="2"/><path d="M4 8 8 3h16l4 5" fill="#e4e4e7" stroke={outline} strokeWidth="2"/><rect x="7" y="15" width="18" height="5" fill="#ececec" stroke={outline}/><circle cx="24" cy="23" r="2" fill="#38a85b"/></>
      break
    default:
      art = <><rect x="4" y="4" width="24" height="24" fill="#dde4f2" stroke={outline} strokeWidth="2"/><path d="m13 10-6 6 6 6m6-12 6 6-6 6" fill="none" stroke={blue} strokeWidth="3"/></>
  }
  return <svg className="pixel-icon" viewBox="0 0 32 32" width={size} height={size} aria-hidden="true" focusable="false" shapeRendering="crispEdges">{art}</svg>
}

function App() {
  const [windows, setWindows] = useState(initialWindows)
  const [selectedProject, setSelectedProject] = useState('wynn')
  const [category, setCategory] = useState<Category>('all')
  const [startOpen, setStartOpen] = useState(false)
  const [clock, setClock] = useState(() => new Date())
  const highestZ = useRef(15)
  const drag = useRef<{ key: PanelKey; left: number; top: number; pointerX: number; pointerY: number } | null>(null)

  useEffect(() => {
    const timer = window.setInterval(() => setClock(new Date()), 30_000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setStartOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  function bringFront(key: PanelKey) {
    const nextZ = ++highestZ.current
    setWindows((current) => ({ ...current, [key]: { ...current[key], z: nextZ } }))
  }

  function openPanel(key: PanelKey) {
    const nextZ = ++highestZ.current
    setWindows((current) => ({
      ...current,
      [key]: { ...current[key], open: true, minimized: false, z: nextZ },
    }))
    setStartOpen(false)
  }

  function closePanel(key: PanelKey) {
    setWindows((current) => ({ ...current, [key]: { ...current[key], open: false, minimized: false } }))
  }

  function toggleTask(key: PanelKey) {
    if (!windows[key].open || windows[key].minimized) {
      openPanel(key)
      return
    }
    if (windows[key].z === Math.max(...panels.filter((id) => windows[id].open && !windows[id].minimized).map((id) => windows[id].z))) {
      setWindows((current) => ({ ...current, [key]: { ...current[key], minimized: true } }))
    } else {
      bringFront(key)
    }
  }

  function toggleMaximize(key: PanelKey) {
    bringFront(key)
    setWindows((current) => ({ ...current, [key]: { ...current[key], maximized: !current[key].maximized } }))
  }

  function beginDrag(event: ReactPointerEvent<HTMLDivElement>, key: PanelKey) {
    if (event.button !== 0 || windows[key].maximized || window.innerWidth < 720) return
    drag.current = { key, left: windows[key].x, top: windows[key].y, pointerX: event.clientX, pointerY: event.clientY }
    event.currentTarget.setPointerCapture(event.pointerId)
    bringFront(key)
  }

  function dragMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!drag.current) return
    const { key, left, top, pointerX, pointerY } = drag.current
    const x = Math.max(0, Math.min(window.innerWidth - 240, left + event.clientX - pointerX))
    const y = Math.max(0, Math.min(window.innerHeight - 100, top + event.clientY - pointerY))
    setWindows((current) => ({ ...current, [key]: { ...current[key], x, y } }))
  }

  const chosenProject = projects.find((project) => project.id === selectedProject) ?? projects[0]
  const filteredProjects = projects.filter((project) => category === 'all' || category === project.category)
  const projectCount = projects.length

  const shortcuts: { key: PanelKey; label: string }[] = [
    { key: 'home', label: 'マイ ポートフォリオ' },
    { key: 'works', label: '制作物' },
    { key: 'about', label: 'ABOUT.TXT' },
    { key: 'research', label: '研究ノート' },
    { key: 'contact', label: '連絡先' },
  ]

  return (
    <main className="desktop" onClick={() => { if (startOpen) setStartOpen(false) }}>
      <div className="desktop-grain" aria-hidden="true" />
      <aside className="desktop-shortcuts" aria-label="デスクトップのショートカット">
        {shortcuts.map(({ key, label }) => (
          <button type="button" className="desktop-shortcut" key={key} onClick={() => openPanel(key)}>
            <Icon name={panelInfo[key].icon} size={40} />
            <span>{label}</span>
          </button>
        ))}
        <a className="desktop-shortcut" href={github} target="_blank" rel="noopener noreferrer">
          <Icon name="globe" size={40} /><span>GitHub</span>
        </a>
      </aside>

      <div className="desktop-stamp" aria-hidden="true"><strong>RANGESA</strong><span>PERSONAL WORKSTATION · 2026</span></div>

      {panels.map((key) => {
        const state = windows[key]
        if (!state.open || state.minimized) return null
        const windowTitle = panelInfo[key].title
        return (
          <section
            key={key}
            className={'window-shell window--' + key + (state.maximized ? ' is-maximized' : '')}
            style={{ left: state.x, top: state.y, zIndex: state.z }}
            aria-label={windowTitle}
            onPointerDown={() => { if (state.z !== highestZ.current) bringFront(key) }}
          >
            <div className="window-titlebar" onPointerDown={(event) => beginDrag(event, key)} onPointerMove={dragMove} onPointerUp={() => { drag.current = null }} onPointerCancel={() => { drag.current = null }}>
              <div className="window-title"><Icon name={panelInfo[key].icon} size={17} /><span>{windowTitle}</span></div>
              <div className="window-actions" onPointerDown={(event) => event.stopPropagation()}>
                <button className="sys-button" type="button" aria-label={windowTitle + 'を最小化'} title="最小化" onClick={() => setWindows((current) => ({ ...current, [key]: { ...current[key], minimized: true } }))}><span className="min-glyph">_</span></button>
                <button className="sys-button" type="button" aria-label={windowTitle + 'の表示サイズを切り替え'} title="最大化/元に戻す" onClick={() => toggleMaximize(key)}><span className="max-glyph">{state.maximized ? '❐' : '□'}</span></button>
                <button className="sys-button" type="button" aria-label={windowTitle + 'を閉じる'} title="閉じる" onClick={() => closePanel(key)}><span className="close-glyph">×</span></button>
              </div>
            </div>

            <div className="menu-bar" aria-label="ウィンドウメニュー">
              <button type="button" onClick={() => openPanel('home')}>ホーム(H)</button>
              <button type="button" onClick={() => openPanel('works')}>制作物(W)</button>
              <button type="button" onClick={() => openPanel('about')}>自己紹介(A)</button>
              <button type="button" onClick={() => openPanel('contact')}>連絡先(C)</button>
            </div>

            {(key === 'home' || key === 'works' || key === 'research') && (
              <div className="address-bar"><span>アドレス</span><span className="address-path"><Icon name="folder" size={15} /> C:\Rangesa\{key === 'home' ? 'Portfolio' : key === 'works' ? 'Projects' : 'Research'}</span></div>
            )}

            <div className="window-scroll">
              {key === 'home' && (
                <div className="welcome-view">
                  <div className="welcome-hero">
                    <div className="welcome-copy">
                      <p className="eyebrow">INDEPENDENT DEVELOPER / JAPAN</p>
                      <h1>アイデアを、<br /><span>実際に動くものへ。</span></h1>
                      <p className="hero-lead">Taryou / Rangesa</p>
                      <p className="hero-description">AIとソフトウェア、ゲーム、低レイヤー。興味の境界を越えて、作って、試して、改善しています。</p>
                      <div className="hero-actions">
                        <button type="button" className="retro-button action-primary" onClick={() => openPanel('works')}><Icon name="folder" size={18} /> 制作物を見る <span aria-hidden="true">→</span></button>
                        <a className="retro-button" href={github} target="_blank" rel="noopener noreferrer"><Icon name="globe" size={18} /> GitHub ↗</a>
                      </div>
                    </div>
                    <div className="boot-screen" aria-label="開発領域の紹介">
                      <div className="boot-top">TARYOU SYSTEM / 2026</div>
                      <div className="boot-terminal">
                        <span className="terminal-line">C:\&gt; whoami</span>
                        <strong>TARYOU <i>/</i> RANGESA</strong>
                        <span className="terminal-line">C:\&gt; dir /b interests</span>
                        <span>AI_AGENTS</span><span>MINECRAFT_MODS</span><span>SYSTEM_TOOLS</span><span>LOW_LEVEL</span>
                        <span className="terminal-line">C:\&gt; <span className="cursor">_</span></span>
                      </div>
                      <div className="boot-bottom"><span>● SYSTEM READY</span><span>JAPAN / JST</span></div>
                    </div>
                  </div>

                  <div className="content-divider"><span>SELECTED WORKS</span><span>01 / 03</span></div>
                  <div className="featured-files">
                    {projects.slice(0, 3).map((project, index) => (
                      <button type="button" className="featured-row" key={project.id} onClick={() => { setCategory('all'); setSelectedProject(project.id); openPanel('works') }}>
                        <span className="featured-index">0{index + 1}</span>
                        <Icon name={project.icon} size={30}/>
                        <span className="featured-main"><strong>{project.name}</strong><small>{project.line}</small></span>
                        <span className="featured-type">{project.kind}</span>
                        <span className="featured-arrow" aria-hidden="true">↗</span>
                      </button>
                    ))}
                  </div>
                  <div className="bottom-note"><span>実績は公開リポジトリから確認できます。</span><button type="button" className="text-link" onClick={() => openPanel('works')}>すべての作品を見る →</button></div>
                </div>
              )}

              {key === 'works' && (
                <div className="works-view">
                  <div className="panel-heading"><div><p className="eyebrow">PROJECT DIRECTORY</p><h2>制作物 <small>/{projectCount} files</small></h2><p>公開中のソースコードと技術的な取り組みです。項目を選ぶと詳細を表示します。</p></div></div>
                  <div className="folder-tabs" aria-label="作品カテゴリ">
                    {([['all', 'すべて'], ['ai', 'AI / MCP'], ['minecraft', 'Minecraft'], ['tools', 'Windowsツール']] as [Category, string][]).map(([id, label]) => (
                      <button key={id} type="button" aria-pressed={category === id} className={category === id ? 'selected' : ''} onClick={() => { setCategory(id); const first = projects.find((project) => id === 'all' || project.category === id); if (first) setSelectedProject(first.id) }}>{label}</button>
                    ))}
                  </div>
                  <div className="explorer-grid">
                    <div className="file-list" aria-label="プロジェクト一覧">
                      <div className="file-list-heading"><span>名前</span><span>種類</span></div>
                      {filteredProjects.map((project) => (
                        <button type="button" key={project.id} aria-pressed={selectedProject === project.id} className={'file-entry' + (selectedProject === project.id ? ' selected' : '')} onClick={() => setSelectedProject(project.id)}>
                          <Icon name={project.icon} size={23} />
                          <span className="file-name">{project.name}</span>
                          <span className="file-type">{project.kind}</span>
                        </button>
                      ))}
                    </div>
                    <article className="file-preview" aria-live="polite">
                      <div className="preview-label">ファイルの詳細 / PREVIEW</div>
                      <div className="preview-title"><Icon name={chosenProject.icon} size={40}/><div><h3>{chosenProject.name}</h3><span>{chosenProject.kind}</span></div></div>
                      <p className="preview-lead">{chosenProject.line}</p>
                      <p>{chosenProject.description}</p>
                      <h4>主な実装</h4>
                      <ul className="checklist">{chosenProject.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
                      <div className="skill-tags">{chosenProject.stack.map((item) => <span key={item}>{item}</span>)}</div>
                      <a className="retro-button action-primary preview-link" href={chosenProject.url} target="_blank" rel="noopener noreferrer"><Icon name="globe" size={18}/> GitHubでソースを見る ↗</a>
                    </article>
                  </div>
                </div>
              )}

              {key === 'about' && (
                <article className="notepad-view">
                  <div className="notepad-paper">
                    <p className="mono-top">ABOUT.TXT <span>— 最終編集: 2026</span></p>
                    <h2>こんにちは、<br />Taryouです。</h2>
                    <p>個人開発者として、ソフトウェア・AI連携・ゲーム向けツールなどを制作しています。</p>
                    <p>特に関心があるのは、「人とソフトウェアの間にある面倒な作業」を、シンプルな仕組みで減らすこと。既存の道具を組み合わせるだけでなく、必要なら自分で新しい道具を作ります。</p>
                    <p>機能だけでなく、動作の軽さ、扱いやすさ、実際に使えることを大切にしています。</p>
                    <div className="notepad-rule" />
                    <h3>主な領域</h3>
                    <div className="about-fields">
                      <div><strong>AI / AUTOMATION</strong><span>MCP、エージェント連携、開発支援</span></div>
                      <div><strong>GAME / MODDING</strong><span>Minecraft Fabric、ゲームUI、翻訳</span></div>
                      <div><strong>SYSTEM / RESEARCH</strong><span>Rust、Python、リバースエンジニアリング、FPGA</span></div>
                      <div><strong>MAKING</strong><span>3Dプリント、ツール制作、試作</span></div>
                    </div>
                    <p className="signature">— Taryou / Rangesa</p>
                  </div>
                </article>
              )}

              {key === 'research' && (
                <div className="research-view">
                  <p className="eyebrow">RESEARCH / DOCUMENTATION</p>
                  <h2>研究と実験の記録</h2>
                  <p>動くコードだけでなく、試験方法・計測・制約も残すようにしています。</p>
                  <div className="research-document">
                    <div className="research-document-top"><Icon name="drive" size={34}/><div><strong>FPGA-assisted Memory Acquisition</strong><span>Technical report / research package</span></div></div>
                    <p>管理されたWindowsの研究環境における、読み取り専用の外部メモリ取得に関する技術レポート。再現性のため、実験データ、検証ログ、構成図を整理しています。</p>
                    <div className="research-caution">状態: 未発表・査読なしの技術報告。公開資料の範囲に基づく記載です。</div>
                    <div className="research-links">
                      <a className="retro-button action-primary" href={github + '/Portfolio/tree/main/research/fpga-memory-acquisition'} target="_blank" rel="noopener noreferrer">研究資料を開く ↗</a>
                      <a className="retro-button" href={github + '/Portfolio/blob/main/research/fpga-memory-acquisition/STATUS.md'} target="_blank" rel="noopener noreferrer">検証状況を読む ↗</a>
                    </div>
                  </div>
                  <p className="research-note">※ 研究領域の記載は成果の保証や査読済み論文であることを意味しません。</p>
                </div>
              )}

              {key === 'contact' && (
                <div className="contact-view">
                  <Icon name="mail" size={56}/>
                  <p className="eyebrow">CONTACT / LINKS</p>
                  <h2>連絡・ソースコード</h2>
                  <p>制作物の詳細、更新状況、技術的なメモはGitHubからご覧いただけます。</p>
                  <a className="retro-button action-primary" href={github} target="_blank" rel="noopener noreferrer"><Icon name="globe" size={20}/> github.com/Rangesa ↗</a>
                  <p className="contact-disclaimer">個別のメールアドレスは掲載していません。GitHub上の公開情報をご確認ください。</p>
                </div>
              )}
            </div>
            <div className="status-bar"><span>{key === 'works' ? filteredProjects.length + ' 個のオブジェクト' : 'Taryou / Rangesa'}</span><span>Portfolio · © 2026</span></div>
          </section>
        )
      })}

      {startOpen && (
        <nav className="start-menu" aria-label="スタートメニュー" onClick={(event) => event.stopPropagation()}>
          <div className="start-banner"><span>RANGESA<span className="banner-muted">98</span></span></div>
          <div className="start-options">
            <div className="start-user">TARYOU / WORKSTATION</div>
            {shortcuts.map(({ key, label }) => <button type="button" key={key} onClick={() => openPanel(key)}><Icon name={panelInfo[key].icon} size={23}/><span>{label}</span><span className="menu-chevron">›</span></button>)}
            <div className="start-separator" />
            <a href={github} target="_blank" rel="noopener noreferrer" onClick={() => setStartOpen(false)}><Icon name="globe" size={23}/><span>GitHubへ移動</span><span className="menu-chevron">↗</span></a>
          </div>
        </nav>
      )}

      <footer className="taskbar" onClick={(event) => event.stopPropagation()}>
        <button type="button" className={'start-button retro-raised' + (startOpen ? ' is-pressed' : '')} aria-expanded={startOpen} aria-controls="start-menu" onClick={() => setStartOpen((current) => !current)}><span className="start-mark"><span/><span/><span/><span/></span> スタート</button>
        <span className="taskbar-divider" />
        <div className="task-buttons" aria-label="開いているウィンドウ">
          {panels.filter((key) => windows[key].open).map((key) => {
            const isActive = !windows[key].minimized && windows[key].z === Math.max(...panels.filter((id) => windows[id].open && !windows[id].minimized).map((id) => windows[id].z), 0)
            return <button type="button" key={key} className={'task-button retro-raised' + (isActive ? ' is-pressed' : '')} onClick={() => toggleTask(key)} aria-pressed={isActive}><Icon name={panelInfo[key].icon} size={17}/><span>{panelInfo[key].title}</span></button>
          })}
        </div>
        <div className="tray"><span className="tray-led" aria-label="ローカル表示" /> <time dateTime={clock.toISOString()}>{clock.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}</time></div>
      </footer>
    </main>
  )
}

export default App
