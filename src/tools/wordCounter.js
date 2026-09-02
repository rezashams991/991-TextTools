import { countWords, countChars, countLines } from '../core/textUtils.js';

export default function run(container) {
  container.innerHTML = `
    <h3>📊 Word Counter</h3>
    <textarea id="input" rows="6" placeholder="Type your text here..." style="width:100%;"></textarea>
    <div id="stats" style="margin-top:0.5rem;display:flex;gap:1.5rem;flex-wrap:wrap;">
      <span><strong>Words:</strong> <span id="words">0</span></span>
      <span><strong>Chars (with spaces):</strong> <span id="charsWith">0</span></span>
      <span><strong>Chars (no spaces):</strong> <span id="charsWithout">0</span></span>
      <span><strong>Lines:</strong> <span id="lines">0</span></span>
    </div>
  `;

  const input = container.querySelector('#input');
  const wordsSpan = container.querySelector('#words');
  const charsWithSpan = container.querySelector('#charsWith');
  const charsWithoutSpan = container.querySelector('#charsWithout');
  const linesSpan = container.querySelector('#lines');

  const update = () => {
    const text = input.value;
    wordsSpan.textContent = countWords(text);
    charsWithSpan.textContent = countChars(text, true);
    charsWithoutSpan.textContent = countChars(text, false);
    linesSpan.textContent = countLines(text);
  };

  input.oninput = update;
  update();
}