'use client';
import React, { useEffect, useState } from 'react';

interface SvgProps extends React.SVGProps<SVGSVGElement> {
  src: string;
}

const Svg: React.FC<SvgProps> = ({ src, ...props }) => {
  const [svgData, setSvgData] = useState<{ innerHTML: string; viewBox?: string }>({
    innerHTML: '',
  });

  useEffect(() => {
    fetch(src)
      .then((res) => res.text())
      .then((data) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'image/svg+xml');
        const svgElement = doc.querySelector('svg');

        if (svgElement) {
          setSvgData({
            innerHTML: svgElement.innerHTML,
            // Забираем viewBox, чтобы работало масштабирование
            viewBox: svgElement.getAttribute('viewBox') || undefined,
          });
        }
      })
      .catch((err) => console.error('Ошибка загрузки SVG:', err));
  }, [src]);

  return (
    <svg
      {...props}
      viewBox={props.viewBox || svgData.viewBox}
      // Это позволяет классам типа w-full перебивать размеры
      dangerouslySetInnerHTML={{ __html: svgData.innerHTML }}
    />
  );
};

export default Svg;