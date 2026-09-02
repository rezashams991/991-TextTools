/**
 * Reverse Lines Tool - Reverse the order of lines
 */

import { reverseLines } from '../core/textUtils.js';

export default function run(container) {
  container.innerHTML = `
    <h3>⬆️⬇️ Reverse Lines</h3>
    <p>Reverse the order of lines (last line becomes first).</p>
    <textarea id="input" rows="6" placeholder="Line 1\nLine 2\nLine 3" style="width:100%;">Line 1\nLine 2\nLine 3</textarea>
    <button id="reverseBtn" style="margin:0.5rem 0;">Reverse Lines</button>
    <div id="output" style="background:#f5f5f5;padding:0.5rem;border-radius:4px;white-space:pre-wrap;"></div>
  `;

  const input = container.querySelector('#input');
  const output = container.querySelector('#output');
  const reverseBtn = container.querySelector('#reverseBtn');

  reverseBtn.onclick = () => {
    output.textContent = reverseLines(input.value);
  };
}