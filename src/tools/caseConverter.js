import { toUpperCase, toLowerCase, toCapitalize, toTitleCase } from '../core/textUtils.js';

export default function run(container) {
  container.innerHTML = `
    <h3>🔤 Case Converter</h3>
    <textarea id="input" rows="4" placeholder="Enter text..." style="width:100%;"></textarea>
    <div style="margin:0.5rem 0;display:flex;gap:0.5rem;flex-wrap:wrap;">
      <button id="upperBtn">UPPER CASE</button>
      <button id="lowerBtn">lower case</button>
      <button id="capitalizeBtn">Capitalize</button>
      <button id="titleBtn">Title Case</button>
    </div>
    <div id="output" style="background:#f5f5f5;padding:0.5rem;border-radius:4px;"></div>
  `;

  const input = container.querySelector('#input');
  const output = container.querySelector('#output');

  const apply = (fn) => {
    output.textContent = fn(input.value);
  };

  container.querySelector('#upperBtn').onclick = () => apply(toUpperCase);
  container.querySelector('#lowerBtn').onclick = () => apply(toLowerCase);
  container.querySelector('#capitalizeBtn').onclick = () => apply(toCapitalize);
  container.querySelector('#titleBtn').onclick = () => apply(toTitleCase);
}