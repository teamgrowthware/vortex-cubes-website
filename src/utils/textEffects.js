/**
 * Hacker Text Scramble Effect
 * Cycles through random characters before revealing the final text.
 */
export const scrambleText = (element, targetText, duration = 30) => {
  const chars = '!<>-_\\\\/[]{}—=+*^?#________';
  let iteration = 0;

  if (!element) return;

  clearInterval(element.scrambleInterval);

  element.scrambleInterval = setInterval(() => {
    element.innerText = targetText
      .split('')
      .map((letter, index) => {
        if (index < iteration) {
          return targetText[index];
        }
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join('');

    if (iteration >= targetText.length) {
      clearInterval(element.scrambleInterval);
    }

    iteration += 1 / 3; // Controls speed of reveal
  }, duration);
};
