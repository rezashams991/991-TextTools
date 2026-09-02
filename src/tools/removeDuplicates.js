import { removeDuplicateLines } from '../core/textUtils.js';

export default function run(container) {
  container.innerHTML = `
    <h3>🧹 Remove Duplicate Lines</h3>
    <textarea id="input" rows="6" placeholder="Line 1\nLine 2\nLine 1\nLine 3" style="width:100%;"></textarea>
    <button id="removeBtn" style="margin:0.5rem 0;">Remove Duplicates</button>
    <div id="output" style="background:#f5f5f5;padding:0.5rem;border-radius:4px;white-space:pre-wrap;"></div>
  `;

  const input = container.querySelector('#input');
  const output = container.querySelector('#output');
  const removeBtn = container.querySelector('#removeBtn');

  removeBtn.onclick = () => {
    output.textContent = removeDuplicateLines(input.value);
  };
}