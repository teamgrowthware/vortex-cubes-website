import React, { useEffect, useRef, useState } from 'react';

const Sparkline = ({ color = '#00f0ff', width = 60, height = 20 }) => {
  const canvasRef = useRef(null);
  const [dataPoints, setDataPoints] = useState(Array(20).fill(10));

  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      // Generate next data point (random walk)
      setDataPoints(prev => {
        const newData = [...prev.slice(1)];
        const lastVal = newData[newData.length - 1];
        let nextVal = lastVal + (Math.random() - 0.5) * 5;
        // Output bounds
        nextVal = Math.max(2, Math.min(18, nextVal));
        newData.push(nextVal);
        return newData;
      });

      animationFrameId = setTimeout(() => {
        requestAnimationFrame(animate);
      }, 100); // update every 100ms
    };

    requestAnimationFrame(animate);

    return () => clearTimeout(animationFrameId);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Draw line
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;

    const stepX = width / (dataPoints.length - 1);

    dataPoints.forEach((point, i) => {
      const x = i * stepX;
      const y = height - point; // invert Y

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Fill under line for glow effect
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();

    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, `${color}40`); // 25% opacity hex equivalent approx
    gradient.addColorStop(1, `${color}00`);
    ctx.fillStyle = gradient;
    ctx.fill();

  }, [dataPoints, width, height, color]);

  return <canvas ref={canvasRef} width={width} height={height} style={{ display: 'block' }} />;
};

export default Sparkline;
