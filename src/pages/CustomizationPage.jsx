import React, { useState } from "react";
import SvgClothing from "../components/SvgClothing";
import "../styles/CustomizationPage.css";

export default function CustomizationPage({
  selectedClothing,
  fabricTypes,
  colors,
  patterns,
  initialCustomization,
  onSave,
  onBack,
}) {
  const [clothingType, setClothingType] = useState(initialCustomization.clothingType);
  const [fabricType, setFabricType] = useState(initialCustomization.fabricType);
  const [pattern, setPattern] = useState(initialCustomization.pattern);
  const [color, setColor] = useState(initialCustomization.color);
  const [clothingFit, setClothingFit] = useState(initialCustomization.clothingFit);

  const handleSave = () => {
    onSave({
      clothingType,
      fabricType,
      pattern,
      color,
      clothingFit,
    });
  };

  const handleDownloadPreview = async () => {
    // export high-res PNG by serializing the SVG and drawing it to a scaled canvas
    const wrapper = document.querySelector("#svg-preview-wrapper");
    if (!wrapper) return alert("Preview not found");
    const svg = wrapper.querySelector("svg");
    if (!svg) return alert("SVG preview not found");

    const viewBox = svg.getAttribute("viewBox") || "0 0 400 600";
    const vbParts = viewBox.split(" ").map((v) => parseFloat(v));
    const vbWidth = vbParts[2] || 400;
    const vbHeight = vbParts[3] || 600;

    const scale = 3; // export at 3x for high-res
    const exportWidth = Math.round(vbWidth * scale);
    const exportHeight = Math.round(vbHeight * scale);

    // Build a standalone SVG string with scaled width/height but same viewBox
    const svgInner = svg.innerHTML;
    const svgString = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns='http://www.w3.org/2000/svg' width='${exportWidth}' height='${exportHeight}' viewBox='${viewBox}'>${svgInner}</svg>`;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = exportWidth;
      canvas.height = exportHeight;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, exportWidth, exportHeight);
      const pngUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = pngUrl;
      a.download = `customization-${clothingType}-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    };
    img.onerror = (e) => {
      alert("Failed to render SVG for export");
      console.error(e);
    };

    // Use data URL to avoid CORS issues
    const svgDataUri = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgString);
    img.src = svgDataUri;
  };

  return (
    <div className="customization-page">
      <div className="customization-container">
        {/* Preview Panel */}
        <div className="preview-panel">
          <h2>Live Preview</h2>
          <div className="clothing-preview">
            <div id="svg-preview-wrapper" style={{ width: "100%", height: "100%" }}>
              <SvgClothing
                type={clothingType}
                color={color}
                pattern={pattern}
                width={400}
                height={600}
              />
            </div>
          </div>
          <button className="download-btn" onClick={handleDownloadPreview}>
            📥 Download Preview
          </button>
        </div>

        {/* Controls Panel */}
        <div className="controls-panel-custom">
          <h2>Customize Your {clothingType.toUpperCase()}</h2>

          {/* Clothing Type */}
          <div className="control-section">
            <label className="control-label">Clothing Type</label>
            <div className="button-group">
              {["coat", "barong", "suit", "pants"].map((type) => (
                <button
                  key={type}
                  className={`model-btn ${clothingType === type ? "active" : ""}`}
                  onClick={() => setClothingType(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Clothing Fit */}
          <div className="control-section">
            <label className="control-label">Fit</label>
            <div className="button-group">
              {["regular", "slim", "loose"].map((fit) => (
                <button
                  key={fit}
                  className={`model-btn ${clothingFit === fit ? "active" : ""}`}
                  onClick={() => setClothingFit(fit)}
                >
                  {fit.charAt(0).toUpperCase() + fit.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Color Picker */}
          <div className="control-section">
            <label className="control-label">Color</label>
            <div className="color-grid">
              {colors.map((c) => (
                <button
                  key={c}
                  className={`color-swatch ${color === c ? "active" : ""}`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                  title={c}
                />
              ))}
            </div>
            <div className="custom-color-input">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
              <span>Custom Color: {color}</span>
            </div>
          </div>

          {/* Fabric Selection */}
          <div className="control-section">
            <label className="control-label">Fabric Type</label>
            <div className="fabric-grid">
              {fabricTypes.map((f) => (
                <button
                  key={f.id}
                  className={`fabric-card ${fabricType === f.id ? "active" : ""}`}
                  onClick={() => setFabricType(f.id)}
                >
                  <div className="fabric-name">{f.name}</div>
                  <div className="fabric-desc">{f.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Pattern Selection */}
          <div className="control-section">
            <label className="control-label">Pattern</label>
            <div className="pattern-grid">
              {patterns.map((p) => (
                <button
                  key={p}
                  className={`pattern-btn ${pattern === p ? "active" : ""}`}
                  onClick={() => setPattern(p)}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="btn-back" onClick={onBack}>
              ← Back
            </button>
            <button className="btn-next" onClick={handleSave}>
              Continue to Review →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
