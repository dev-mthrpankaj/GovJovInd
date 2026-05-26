(function () {
    "use strict";

    window.GJU_QUIZ_BANK = window.GJU_QUIZ_BANK || [];

    const quizId = "math-circle-image-set-1";
    const PI_NOTE = "Use pi = 22/7 where required.";

    function escapeXml(value) {
        return String(value || "").replace(/[&<>"']/g, (character) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "\"": "&quot;",
            "'": "&apos;"
        }[character]));
    }

    function line(x1, y1, x2, y2, extra = "") {
        return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ${extra}/>`;
    }

    function label(x, y, text, extra = "") {
        return `<text x="${x}" y="${y}" ${extra}>${escapeXml(text)}</text>`;
    }

    function dot(x, y, name) {
        return `<circle cx="${x}" cy="${y}" r="4" class="point"/>${label(x + 8, y - 8, name, 'class="mark"')}`;
    }

    function angleRay(cx, cy, radius, degrees) {
        const radians = degrees * Math.PI / 180;
        return {
            x: cx + radius * Math.cos(radians),
            y: cy - radius * Math.sin(radians)
        };
    }

    function frame(title, shapes, footer) {
        return `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" width="640" height="360">
                <rect width="640" height="360" rx="16" fill="#ffffff"/>
                <style>
                    text { font-family: Arial, sans-serif; fill: #111827; font-size: 15px; }
                    .heading { fill: #1d4ed8; font-size: 18px; font-weight: 700; }
                    .mark { font-weight: 700; }
                    .circle { fill: #eff6ff; stroke: #2563eb; stroke-width: 3; }
                    .ring { fill: none; stroke: #2563eb; stroke-width: 3; }
                    .shape { fill: none; stroke: #111827; stroke-width: 2.5; }
                    .dash { fill: none; stroke: #64748b; stroke-width: 2; stroke-dasharray: 6 5; }
                    .highlight { fill: #dbeafe; stroke: #2563eb; stroke-width: 2.5; }
                    .tangent { stroke: #f97316; stroke-width: 3; }
                    .point { fill: #111827; }
                    .answer { fill: #166534; font-size: 16px; font-weight: 700; }
                    .small { fill: #475569; font-size: 13px; }
                </style>
                ${label(22, 30, title, 'class="heading"')}
                ${shapes}
                ${label(22, 338, footer, footer.indexOf("Answer:") === 0 ? 'class="answer"' : 'class="small"')}
            </svg>
        `;
    }

    function basicCircle(visual) {
        const shapes = `
            <circle cx="285" cy="176" r="104" class="circle"/>
            ${visual.diameter ? line(181, 176, 389, 176, 'class="shape"') : ""}
            ${visual.radius ? line(285, 176, 389, 176, 'class="shape"') : ""}
            ${dot(285, 176, "O")}
            ${visual.diameter ? `${dot(181, 176, "A")}${dot(389, 176, "B")}${label(230, 163, visual.diameter, 'class="mark"')}` : ""}
            ${visual.radius ? `${dot(389, 176, "A")}${label(310, 163, visual.radius, 'class="mark"')}` : ""}
            ${visual.caption ? label(430, 165, visual.caption, 'class="mark"') : ""}
            ${visual.caption2 ? label(430, 195, visual.caption2, 'class="mark"') : ""}
        `;
        return shapes;
    }

    function sector(visual) {
        const center = { x: 275, y: 180 };
        const radius = 105;
        const first = angleRay(center.x, center.y, radius, 0);
        const second = angleRay(center.x, center.y, radius, visual.angle);
        const largeArc = visual.angle > 180 ? 1 : 0;
        const shadedPath = `M ${center.x} ${center.y} L ${first.x} ${first.y} A ${radius} ${radius} 0 ${largeArc} 0 ${second.x} ${second.y} Z`;
        return `
            <circle cx="${center.x}" cy="${center.y}" r="${radius}" class="circle"/>
            <path d="${shadedPath}" class="highlight"/>
            ${line(center.x, center.y, first.x, first.y, 'class="shape"')}
            ${line(center.x, center.y, second.x, second.y, 'class="shape"')}
            ${dot(center.x, center.y, "O")}
            ${label(center.x + 24, center.y - 15, `${visual.angle} deg`, 'class="mark"')}
            ${label(430, 160, visual.radius, 'class="mark"')}
            ${visual.caption ? label(430, 192, visual.caption, 'class="mark"') : ""}
        `;
    }

    function ring(visual) {
        return `
            <circle cx="275" cy="178" r="108" class="highlight"/>
            <circle cx="275" cy="178" r="56" fill="#ffffff" stroke="#2563eb" stroke-width="3"/>
            ${line(275, 178, 383, 178, 'class="shape"')}
            ${line(275, 178, 331, 178, 'class="shape"')}
            ${dot(275, 178, "O")}
            ${label(340, 164, visual.outer, 'class="mark"')}
            ${label(278, 202, visual.inner, 'class="mark"')}
            ${visual.caption ? label(430, 180, visual.caption, 'class="mark"') : ""}
        `;
    }

    function chord(visual) {
        const chordY = visual.chordY || 128;
        return `
            <circle cx="270" cy="180" r="112" class="circle"/>
            ${line(188, chordY, 352, chordY, 'class="shape"')}
            ${line(270, 180, 270, chordY, 'class="dash"')}
            ${line(270, 180, 352, chordY, 'class="shape"')}
            ${dot(270, 180, "O")}
            ${dot(188, chordY, "A")}
            ${dot(352, chordY, "B")}
            ${visual.radius ? label(308, 167, visual.radius, 'class="mark"') : ""}
            ${visual.distance ? label(278, 153, visual.distance, 'class="mark"') : ""}
            ${visual.chord ? label(232, chordY - 12, visual.chord, 'class="mark"') : ""}
            ${visual.caption ? label(420, 182, visual.caption, 'class="mark"') : ""}
        `;
    }

    function tangent(visual) {
        const ox = 220;
        const oy = 185;
        const r = 82;
        const px = 492;
        const py = 185;
        const d = px - ox;
        const tx = ox + (r * r / d);
        const ty = oy - (r * Math.sqrt(d * d - r * r) / d);
        return `
            <circle cx="${ox}" cy="${oy}" r="${r}" class="circle"/>
            ${line(ox, oy, px, py, 'class="dash"')}
            ${line(ox, oy, tx, ty, 'class="shape"')}
            ${line(tx, ty, px, py, 'class="tangent"')}
            ${dot(ox, oy, "O")}
            ${dot(tx, ty, "T")}
            ${dot(px, py, "P")}
            ${label(246, 152, visual.radius, 'class="mark"')}
            ${visual.op ? label(346, 204, visual.op, 'class="mark"') : ""}
            ${visual.pt ? label(372, 122, visual.pt, 'class="mark"') : ""}
            ${visual.caption ? label(410, 260, visual.caption, 'class="mark"') : ""}
        `;
    }

    function angles(visual) {
        const cx = 270;
        const cy = 176;
        const r = 108;
        const centralAngle = Number(visual.angle) || 100;
        const a = angleRay(cx, cy, r, (180 - centralAngle) / 2);
        const b = angleRay(cx, cy, r, (180 + centralAngle) / 2);
        const c = angleRay(cx, cy, r, 270);
        return `
            <circle cx="${cx}" cy="${cy}" r="${r}" class="circle"/>
            ${line(cx, cy, a.x, a.y, 'class="shape"')}
            ${line(cx, cy, b.x, b.y, 'class="shape"')}
            ${line(c.x, c.y, a.x, a.y, 'class="shape"')}
            ${line(c.x, c.y, b.x, b.y, 'class="shape"')}
            ${dot(cx, cy, "O")}
            ${dot(a.x, a.y, "A")}
            ${dot(b.x, b.y, "B")}
            ${dot(c.x, c.y, "C")}
            ${label(252, 145, visual.centerAngle || "", 'class="mark"')}
            ${label(253, 273, visual.inscribedAngle || "", 'class="mark"')}
            ${visual.caption ? label(420, 180, visual.caption, 'class="mark"') : ""}
        `;
    }

    function tangentChord(visual) {
        return `
            <circle cx="255" cy="180" r="104" class="circle"/>
            ${line(359, 66, 359, 292, 'class="tangent"')}
            ${line(359, 180, 188, 101, 'class="shape"')}
            ${dot(255, 180, "O")}${dot(359, 180, "T")}${dot(188, 101, "A")}
            ${label(369, 160, "P", 'class="mark"')}
            ${label(320, 139, visual.angle, 'class="mark"')}
            ${label(410, 190, visual.caption, 'class="mark"')}
        `;
    }

    function cyclic(visual) {
        return `
            <circle cx="270" cy="180" r="110" class="circle"/>
            <polygon points="216,85 350,112 328,256 187,222" class="shape"/>
            ${dot(216, 85, "A")}${dot(350, 112, "B")}${dot(328, 256, "C")}${dot(187, 222, "D")}
            ${label(225, 112, visual.angleA || "", 'class="mark"')}
            ${label(290, 238, visual.angleC || "", 'class="mark"')}
            ${visual.caption ? label(425, 180, visual.caption, 'class="mark"') : ""}
        `;
    }

    function intersecting(visual) {
        return `
            <circle cx="270" cy="180" r="112" class="circle"/>
            ${line(182, 116, 355, 243, 'class="shape"')}
            ${line(188, 245, 350, 110, 'class="shape"')}
            ${dot(270, 180, "P")}
            ${dot(182, 116, "A")}${dot(355, 243, "B")}${dot(188, 245, "C")}${dot(350, 110, "D")}
            ${label(218, 143, visual.ap || "", 'class="mark"')}
            ${label(302, 217, visual.pb || "", 'class="mark"')}
            ${label(215, 219, visual.cp || "", 'class="mark"')}
            ${label(302, 143, visual.pd || "", 'class="mark"')}
            ${visual.caption ? label(424, 180, visual.caption, 'class="mark"') : ""}
        `;
    }

    function secants(visual) {
        return `
            <circle cx="242" cy="180" r="102" class="circle"/>
            ${visual.withTangent ? line(322, 118, 500, 190, 'class="tangent"') : line(160, 110, 500, 190, 'class="shape"')}
            ${line(154, 235, 500, 190, 'class="shape"')}
            ${dot(500, 190, "P")}
            ${label(360, 217, visual.lower || "", 'class="mark"')}
            ${label(350, 148, visual.upper || "", 'class="mark"')}
            ${label(385, 272, visual.caption || "", 'class="mark"')}
        `;
    }

    function twoTangents(visual) {
        const ox = 230;
        const oy = 180;
        const r = 84;
        const halfAngle = (Number(visual.angle) || 110) * Math.PI / 360;
        const tx = ox + r * Math.cos(halfAngle);
        const topY = oy - r * Math.sin(halfAngle);
        const bottomY = oy + r * Math.sin(halfAngle);
        const px = ox + r / Math.cos(halfAngle);
        return `
            <circle cx="${ox}" cy="${oy}" r="${r}" class="circle"/>
            ${line(px, oy, tx, topY, 'class="tangent"')}
            ${line(px, oy, tx, bottomY, 'class="tangent"')}
            ${line(ox, oy, tx, topY, 'class="shape"')}
            ${line(ox, oy, tx, bottomY, 'class="shape"')}
            ${dot(ox, oy, "O")}${dot(tx, topY, "A")}${dot(tx, bottomY, "B")}${dot(px, oy, "P")}
            ${label(246, 183, visual.centerAngle, 'class="mark"')}
            ${label(405, 179, visual.outerAngle, 'class="mark"')}
        `;
    }

    function twoCircles(visual) {
        const internal = visual.internal;
        return internal ? `
            <circle cx="260" cy="180" r="112" class="circle"/>
            <circle cx="330" cy="180" r="50" fill="#ffffff" stroke="#f97316" stroke-width="3"/>
            ${line(260, 180, 330, 180, 'class="shape"')}
            ${dot(260, 180, "O1")}${dot(330, 180, "O2")}
            ${label(212, 152, visual.r1, 'class="mark"')}
            ${label(316, 152, visual.r2, 'class="mark"')}
            ${label(275, 205, visual.distance || "?", 'class="mark"')}
        ` : `
            <circle cx="215" cy="180" r="86" class="circle"/>
            <circle cx="395" cy="180" r="48" fill="#fff7ed" stroke="#f97316" stroke-width="3"/>
            ${line(215, 180, 395, 180, 'class="shape"')}
            ${visual.tangent ? line(178, 93, 418, 131, 'class="tangent"') : ""}
            ${dot(215, 180, "O1")}${dot(395, 180, "O2")}
            ${label(183, 150, visual.r1, 'class="mark"')}
            ${label(383, 150, visual.r2, 'class="mark"')}
            ${label(276, 205, visual.distance || "?", 'class="mark"')}
            ${visual.tangent ? label(270, 95, "Tangent = ?", 'class="mark"') : ""}
        `;
    }

    function wheel(visual) {
        return `
            ${line(90, 270, 545, 270, 'class="shape"')}
            <circle cx="245" cy="180" r="88" class="circle"/>
            ${line(245, 180, 333, 180, 'class="shape"')}
            ${dot(245, 180, "O")}
            ${label(269, 163, visual.radius, 'class="mark"')}
            ${label(375, 260, visual.distance, 'class="mark"')}
            ${visual.caption ? label(390, 165, visual.caption, 'class="mark"') : ""}
        `;
    }

    function squareCircle(visual) {
        const insideSquare = visual.mode === "square-inside";
        return insideSquare ? `
            <circle cx="270" cy="180" r="112" class="circle"/>
            <rect x="191" y="101" width="158" height="158" class="shape"/>
            ${line(191, 101, 349, 259, 'class="dash"')}
            ${dot(270, 180, "O")}
            ${label(215, 178, visual.radius, 'class="mark"')}
            ${label(362, 180, visual.caption, 'class="mark"')}
        ` : `
            <rect x="158" y="68" width="224" height="224" fill="#eff6ff" stroke="#111827" stroke-width="2.5"/>
            <circle cx="270" cy="180" r="112" class="ring"/>
            ${line(158, 180, 382, 180, 'class="dash"')}
            ${dot(270, 180, "O")}
            ${label(208, 167, visual.side, 'class="mark"')}
            ${label(416, 180, visual.caption, 'class="mark"')}
        `;
    }

    function shadedCircle(visual) {
        return sector({ angle: visual.angle, radius: visual.radius, caption: visual.caption });
    }

    function drawVisual(visual) {
        switch (visual.type) {
            case "sector": return sector(visual);
            case "ring": return ring(visual);
            case "chord": return chord(visual);
            case "tangent": return tangent(visual);
            case "tangent-chord": return tangentChord(visual);
            case "angles": return angles(visual);
            case "cyclic": return cyclic(visual);
            case "intersecting": return intersecting(visual);
            case "secants": return secants(visual);
            case "two-tangents": return twoTangents(visual);
            case "two-circles": return twoCircles(visual);
            case "wheel": return wheel(visual);
            case "square-circle": return squareCircle(visual);
            case "shaded": return shadedCircle(visual);
            default: return basicCircle(visual);
        }
    }

    function asImage(question, solved) {
        const footer = solved ? `Answer: ${question.solution}` : (question.note || PI_NOTE);
        const svg = frame(question.topic, drawVisual(question.visual), footer);
        return {
            src: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`,
            alt: solved ? `${question.topic} solution diagram` : `${question.topic} question diagram`
        };
    }

    const records = [
        { topic: "Radius and Diameter", question: "AB is a diameter of the shown circle and AB = 14 cm. Find radius OA.", options: ["5 cm", "6 cm", "7 cm", "14 cm"], correctAnswer: 2, explanation: "The radius is half of the diameter. OA = 14 / 2 = 7 cm.", solution: "OA = 7 cm", visual: { type: "basic", diameter: "AB = 14 cm" } },
        { topic: "Radius and Diameter", question: "OA is a radius of the shown circle and OA = 9 cm. Find diameter AB.", options: ["9 cm", "16 cm", "18 cm", "27 cm"], correctAnswer: 2, explanation: "Diameter is twice the radius. AB = 2 x 9 = 18 cm.", solution: "AB = 18 cm", visual: { type: "basic", radius: "OA = 9 cm", caption: "Find diameter" } },
        { topic: "Circumference", question: "The radius of the shown circle is 7 cm. Find its circumference.", options: ["22 cm", "44 cm", "77 cm", "154 cm"], correctAnswer: 1, explanation: "Circumference = 2 x pi x r = 2 x 22/7 x 7 = 44 cm.", solution: "Circumference = 44 cm", visual: { type: "basic", radius: "r = 7 cm", caption: "Find boundary length" } },
        { topic: "Area", question: "The radius of the shown circular region is 7 cm. Find its area.", options: ["44 cm^2", "77 cm^2", "154 cm^2", "308 cm^2"], correctAnswer: 2, explanation: "Area = pi x r^2 = 22/7 x 7 x 7 = 154 cm^2.", solution: "Area = 154 cm^2", visual: { type: "basic", radius: "r = 7 cm", caption: "Find area" } },
        { topic: "Circumference", question: "The diameter of the circular track shown is 21 cm. Find its circumference.", options: ["33 cm", "44 cm", "66 cm", "132 cm"], correctAnswer: 2, explanation: "Circumference = pi x diameter = 22/7 x 21 = 66 cm.", solution: "Circumference = 66 cm", visual: { type: "basic", diameter: "d = 21 cm", caption: "Find boundary length" } },
        { topic: "Area", question: "A circular sheet has diameter 28 cm as shown. Find its area.", options: ["308 cm^2", "616 cm^2", "784 cm^2", "1232 cm^2"], correctAnswer: 1, explanation: "Radius = 14 cm. Area = 22/7 x 14 x 14 = 616 cm^2.", solution: "Area = 616 cm^2", visual: { type: "basic", diameter: "d = 28 cm", caption: "Find sheet area" } },
        { topic: "Reverse Circumference", question: "The circumference of the circle is 88 cm. Find the radius shown as OA.", options: ["7 cm", "12 cm", "14 cm", "28 cm"], correctAnswer: 2, explanation: "2 x 22/7 x r = 88, so r = 14 cm.", solution: "OA = 14 cm", visual: { type: "basic", radius: "OA = ?", caption: "C = 88 cm" } },
        { topic: "Reverse Circumference", question: "The circumference of the shown circle is 132 cm. What is its diameter?", options: ["21 cm", "35 cm", "42 cm", "66 cm"], correctAnswer: 2, explanation: "Diameter = circumference / pi = 132 x 7 / 22 = 42 cm.", solution: "Diameter = 42 cm", visual: { type: "basic", diameter: "d = ?", caption: "C = 132 cm" } },
        { topic: "Reverse Area", question: "The area of the shown circular plot is 616 cm^2. Find its radius.", options: ["7 cm", "12 cm", "14 cm", "21 cm"], correctAnswer: 2, explanation: "22/7 x r^2 = 616 gives r^2 = 196, therefore r = 14 cm.", solution: "Radius = 14 cm", visual: { type: "basic", radius: "r = ?", caption: "A = 616 cm^2" } },
        { topic: "Semicircle", question: "The shaded semicircle has radius 14 cm. Find its area.", options: ["154 cm^2", "308 cm^2", "462 cm^2", "616 cm^2"], correctAnswer: 1, explanation: "Area of semicircle = 1/2 x pi x r^2 = 1/2 x 616 = 308 cm^2.", solution: "Area = 308 cm^2", visual: { type: "sector", angle: 180, radius: "r = 14 cm", caption: "Semicircle" } },
        { topic: "Semicircle Perimeter", question: "The shown semicircle has radius 7 cm. Find its perimeter including the diameter.", options: ["22 cm", "29 cm", "36 cm", "44 cm"], correctAnswer: 2, explanation: "Perimeter = pi x r + 2r = 22 + 14 = 36 cm.", solution: "Perimeter = 36 cm", visual: { type: "sector", angle: 180, radius: "r = 7 cm", caption: "Include diameter" } },
        { topic: "Quadrant", question: "The shaded quadrant has radius 14 cm. Find the shaded area.", options: ["77 cm^2", "154 cm^2", "308 cm^2", "616 cm^2"], correctAnswer: 1, explanation: "Quadrant area = 1/4 x pi x r^2 = 1/4 x 616 = 154 cm^2.", solution: "Area = 154 cm^2", visual: { type: "sector", angle: 90, radius: "r = 14 cm", caption: "Quadrant" } },
        { topic: "Quadrant Perimeter", question: "Find the perimeter of the shown quadrant whose radius is 14 cm.", options: ["36 cm", "44 cm", "50 cm", "56 cm"], correctAnswer: 2, explanation: "Arc length = 1/4 x 88 = 22 cm. Perimeter = 22 + 14 + 14 = 50 cm.", solution: "Perimeter = 50 cm", visual: { type: "sector", angle: 90, radius: "r = 14 cm", caption: "Find total edge" } },
        { topic: "Annulus", question: "The circular ring has outer radius 14 cm and inner radius 7 cm. Find its area.", options: ["308 cm^2", "385 cm^2", "462 cm^2", "616 cm^2"], correctAnswer: 2, explanation: "Ring area = pi(R^2 - r^2) = 22/7 x (196 - 49) = 462 cm^2.", solution: "Ring area = 462 cm^2", visual: { type: "ring", outer: "R = 14 cm", inner: "r = 7 cm" } },
        { topic: "Concentric Circles", question: "Two concentric circles have radii 14 cm and 7 cm. Find the difference of their circumferences.", options: ["22 cm", "36 cm", "44 cm", "66 cm"], correctAnswer: 2, explanation: "Difference = 2 x pi x (14 - 7) = 2 x 22/7 x 7 = 44 cm.", solution: "Difference = 44 cm", visual: { type: "ring", outer: "R = 14 cm", inner: "r = 7 cm", caption: "Difference of C" } },
        { topic: "Rolling Wheel", question: "A wheel of radius 35 cm covers 440 m without slipping. How many revolutions does it make?", options: ["100", "150", "200", "220"], correctAnswer: 2, explanation: "One revolution covers 2 x 22/7 x 35 = 220 cm = 2.2 m. Revolutions = 440 / 2.2 = 200.", solution: "200 revolutions", visual: { type: "wheel", radius: "r = 35 cm", distance: "Distance = 440 m", caption: "Rolling wheel" } },
        { topic: "Arc Length", question: "An arc of a circle with radius 7 cm has length 11 cm. Find the central angle subtended by the arc.", options: ["45 deg", "60 deg", "90 deg", "120 deg"], correctAnswer: 2, explanation: "Full circumference is 44 cm. The arc is 11/44 = 1/4 of the circle, so its angle is 90 deg.", solution: "Central angle = 90 deg", visual: { type: "sector", angle: 90, radius: "r = 7 cm", caption: "Arc = 11 cm" } },
        { topic: "Arc Length", question: "Find the length of the highlighted 90 deg arc in a circle of radius 14 cm.", options: ["11 cm", "22 cm", "44 cm", "88 cm"], correctAnswer: 1, explanation: "Arc length = 90/360 x 2 x 22/7 x 14 = 22 cm.", solution: "Arc length = 22 cm", visual: { type: "sector", angle: 90, radius: "r = 14 cm", caption: "Find arc" } },
        { topic: "Sector Area", question: "The highlighted sector has radius 28 cm and angle 45 deg. Find its area.", options: ["154 cm^2", "308 cm^2", "462 cm^2", "616 cm^2"], correctAnswer: 1, explanation: "Sector area = 45/360 x 22/7 x 28 x 28 = 308 cm^2.", solution: "Sector area = 308 cm^2", visual: { type: "sector", angle: 45, radius: "r = 28 cm", caption: "Find sector area" } },
        { topic: "Sector Area", question: "A highlighted sector has radius 21 cm and central angle 120 deg. Find its area.", options: ["308 cm^2", "441 cm^2", "462 cm^2", "924 cm^2"], correctAnswer: 2, explanation: "Sector area = 120/360 x 22/7 x 21 x 21 = 462 cm^2.", solution: "Sector area = 462 cm^2", visual: { type: "sector", angle: 120, radius: "r = 21 cm", caption: "Find sector area" } },
        { topic: "Chord Length", question: "A chord is 5 cm from the center of a circle of radius 13 cm. Find the chord length AB.", options: ["10 cm", "12 cm", "24 cm", "26 cm"], correctAnswer: 2, explanation: "Half chord = sqrt(13^2 - 5^2) = sqrt(144) = 12 cm. Hence chord = 24 cm.", solution: "AB = 24 cm", visual: { type: "chord", radius: "r = 13 cm", distance: "5 cm", chord: "AB = ?" } },
        { topic: "Chord Distance", question: "Chord AB is 16 cm long in a circle of radius 10 cm. Find its perpendicular distance from center O.", options: ["4 cm", "6 cm", "8 cm", "10 cm"], correctAnswer: 1, explanation: "Half chord = 8 cm. Distance = sqrt(10^2 - 8^2) = sqrt(36) = 6 cm.", solution: "Distance = 6 cm", visual: { type: "chord", radius: "r = 10 cm", distance: "?", chord: "AB = 16 cm" } },
        { topic: "Tangent Length", question: "From external point P, PT is tangent to the circle. If OP = 13 cm and OT = 5 cm, find PT.", options: ["8 cm", "10 cm", "12 cm", "18 cm"], correctAnswer: 2, explanation: "OT is perpendicular to tangent PT. PT = sqrt(OP^2 - OT^2) = sqrt(169 - 25) = 12 cm.", solution: "PT = 12 cm", visual: { type: "tangent", radius: "OT = 5 cm", op: "OP = 13 cm", pt: "PT = ?" } },
        { topic: "Tangent Triangle", question: "PT is tangent at T. If PT = 24 cm and radius OT = 7 cm, find OP.", options: ["17 cm", "23 cm", "25 cm", "31 cm"], correctAnswer: 2, explanation: "Triangle OTP is right angled at T. OP = sqrt(24^2 + 7^2) = sqrt(625) = 25 cm.", solution: "OP = 25 cm", visual: { type: "tangent", radius: "OT = 7 cm", op: "OP = ?", pt: "PT = 24 cm" } },
        { topic: "Radius and Tangent", question: "What is the angle between radius OT and tangent PT at the point of contact T?", options: ["30 deg", "45 deg", "60 deg", "90 deg"], correctAnswer: 3, explanation: "A radius drawn to the point of contact is perpendicular to the tangent. Therefore the angle is 90 deg.", solution: "Angle OTP = 90 deg", visual: { type: "tangent", radius: "OT", pt: "PT", caption: "Angle OTP = ?" } },
        { topic: "Alternate Segment", question: "The angle between tangent PT and chord TA is 35 deg. Find the angle in the alternate segment subtended by chord TA.", options: ["35 deg", "55 deg", "70 deg", "145 deg"], correctAnswer: 0, explanation: "By the alternate segment theorem, the angle between tangent and chord equals the angle in the opposite arc. It is 35 deg.", solution: "Angle = 35 deg", visual: { type: "tangent-chord", angle: "35 deg", caption: "Alternate angle ?" } },
        { topic: "Central Angle", question: "An angle subtended by chord AB at the circumference is 42 deg. Find angle AOB at the center.", options: ["42 deg", "64 deg", "84 deg", "96 deg"], correctAnswer: 2, explanation: "Angle at the center is twice the angle at the circumference on the same chord. AOB = 2 x 42 = 84 deg.", solution: "Angle AOB = 84 deg", visual: { type: "angles", angle: 84, centerAngle: "?", inscribedAngle: "42 deg" } },
        { topic: "Inscribed Angle", question: "Chord AB subtends an angle of 110 deg at center O. Find angle ACB at the circumference.", options: ["45 deg", "55 deg", "70 deg", "110 deg"], correctAnswer: 1, explanation: "Angle at the circumference = half of angle at center = 110 / 2 = 55 deg.", solution: "Angle ACB = 55 deg", visual: { type: "angles", angle: 110, centerAngle: "110 deg", inscribedAngle: "?" } },
        { topic: "Semicircle Theorem", question: "AB is a diameter and C is a point on the circle. Find angle ACB.", options: ["45 deg", "60 deg", "90 deg", "180 deg"], correctAnswer: 2, explanation: "The angle subtended by a diameter at any point on the circle is a right angle. Angle ACB = 90 deg.", solution: "Angle ACB = 90 deg", visual: { type: "angles", angle: 180, centerAngle: "180 deg", inscribedAngle: "?" } },
        { topic: "Cyclic Quadrilateral", question: "ABCD is a cyclic quadrilateral. If angle A = 112 deg, find its opposite angle C.", options: ["58 deg", "68 deg", "78 deg", "112 deg"], correctAnswer: 1, explanation: "Opposite angles in a cyclic quadrilateral are supplementary. C = 180 - 112 = 68 deg.", solution: "Angle C = 68 deg", visual: { type: "cyclic", angleA: "112 deg", angleC: "?" } },
        { topic: "Equal Chords", question: "Equal chords AB and CD of the same circle subtend central angles. If angle AOB = 76 deg, find angle COD.", options: ["38 deg", "76 deg", "104 deg", "152 deg"], correctAnswer: 1, explanation: "Equal chords of a circle subtend equal angles at the center. Hence angle COD = 76 deg.", solution: "Angle COD = 76 deg", visual: { type: "angles", angle: 76, centerAngle: "76 deg", caption: "AB = CD" } },
        { topic: "Chords and Angles", question: "Four chords subtend central angles 40 deg, 70 deg, 100 deg and 120 deg. Which chord is longest?", options: ["Chord at 40 deg", "Chord at 70 deg", "Chord at 100 deg", "Chord at 120 deg"], correctAnswer: 3, explanation: "In the same circle, the greater central angle subtends the longer chord. The 120 deg chord is longest.", solution: "Chord at 120 deg", visual: { type: "sector", angle: 120, radius: "Same circle", caption: "Largest angle" } },
        { topic: "Perpendicular Chord", question: "A diameter is perpendicular to chord AB and cuts it at M. If AM = 8 cm, find chord AB.", options: ["8 cm", "12 cm", "16 cm", "24 cm"], correctAnswer: 2, explanation: "A perpendicular from the center to a chord bisects it. AB = 2 x AM = 16 cm.", solution: "AB = 16 cm", visual: { type: "chord", distance: "OM", chord: "AM = 8 cm" } },
        { topic: "Intersecting Chords", question: "Chords AB and CD intersect at P. If AP = 4 cm, PB = 9 cm and CP = 6 cm, find PD.", options: ["4 cm", "6 cm", "8 cm", "9 cm"], correctAnswer: 1, explanation: "AP x PB = CP x PD. Thus 4 x 9 = 6 x PD, so PD = 6 cm.", solution: "PD = 6 cm", visual: { type: "intersecting", ap: "4", pb: "9", cp: "6", pd: "?" } },
        { topic: "Tangent Secant", question: "From point P, a tangent has length PT. A secant has external part 4 cm and total length 16 cm. Find PT.", options: ["6 cm", "8 cm", "10 cm", "12 cm"], correctAnswer: 1, explanation: "PT^2 = external secant x total secant = 4 x 16 = 64. Therefore PT = 8 cm.", solution: "PT = 8 cm", visual: { type: "secants", withTangent: true, upper: "PT = ?", lower: "4 cm; total 16 cm" } },
        { topic: "Two Secants", question: "Two secants from P satisfy PA = 3 cm, PB = 12 cm and PC = 4 cm. Find total length PD.", options: ["6 cm", "8 cm", "9 cm", "12 cm"], correctAnswer: 2, explanation: "PA x PB = PC x PD. Therefore 3 x 12 = 4 x PD, giving PD = 9 cm.", solution: "PD = 9 cm", visual: { type: "secants", upper: "3 cm; total 12 cm", lower: "4 cm; total ?" } },
        { topic: "External Secant Angle", question: "Two secants meet outside a circle. Their intercepted arcs are 150 deg and 70 deg. Find the external angle.", options: ["30 deg", "40 deg", "50 deg", "80 deg"], correctAnswer: 1, explanation: "External angle = 1/2 x (larger arc - smaller arc) = 1/2 x 80 = 40 deg.", solution: "External angle = 40 deg", visual: { type: "secants", upper: "Arc = 150 deg", lower: "Arc = 70 deg", caption: "Outside angle ?" } },
        { topic: "Intersecting Chord Angle", question: "Two chords intersect inside a circle. The intercepted arcs are 120 deg and 60 deg. Find the interior angle.", options: ["60 deg", "80 deg", "90 deg", "120 deg"], correctAnswer: 2, explanation: "Interior angle = 1/2 x (120 + 60) = 90 deg.", solution: "Interior angle = 90 deg", visual: { type: "intersecting", ap: "Arc 120", cp: "Arc 60", pd: "Angle ?" } },
        { topic: "Common Tangent", question: "Two circles have radii 8 cm and 3 cm, with centers 13 cm apart. Find their direct common tangent length.", options: ["5 cm", "10 cm", "12 cm", "13 cm"], correctAnswer: 2, explanation: "Direct tangent length = sqrt(13^2 - (8 - 3)^2) = sqrt(169 - 25) = 12 cm.", solution: "Tangent = 12 cm", visual: { type: "two-circles", r1: "8 cm", r2: "3 cm", distance: "13 cm", tangent: true } },
        { topic: "Internal Touching", question: "Two circles touch internally and have radii 9 cm and 4 cm. Find the distance between their centers.", options: ["5 cm", "9 cm", "13 cm", "36 cm"], correctAnswer: 0, explanation: "For internal contact, distance between centers equals the difference of radii: 9 - 4 = 5 cm.", solution: "Centers distance = 5 cm", visual: { type: "two-circles", internal: true, r1: "9 cm", r2: "4 cm", distance: "?" } },
        { topic: "External Touching", question: "Two circles touch externally and have radii 9 cm and 4 cm. Find the distance between their centers.", options: ["5 cm", "9 cm", "13 cm", "18 cm"], correctAnswer: 2, explanation: "For external contact, centers distance equals the sum of radii: 9 + 4 = 13 cm.", solution: "Centers distance = 13 cm", visual: { type: "two-circles", r1: "9 cm", r2: "4 cm", distance: "?" } },
        { topic: "Circular Path", question: "A circular walking path has outer radius 21 m and inner radius 14 m. Find its area.", options: ["308 m^2", "462 m^2", "616 m^2", "770 m^2"], correctAnswer: 3, explanation: "Path area = pi(21^2 - 14^2) = 22/7 x 245 = 770 m^2.", solution: "Path area = 770 m^2", visual: { type: "ring", outer: "R = 21 m", inner: "r = 14 m", caption: "Walking path" } },
        { topic: "Fencing Cost", question: "A circular garden has radius 14 m. Fencing costs Rs 5 per metre. Find total fencing cost.", options: ["Rs 220", "Rs 308", "Rs 440", "Rs 616"], correctAnswer: 2, explanation: "Circumference = 2 x 22/7 x 14 = 88 m. Cost = 88 x 5 = Rs 440.", solution: "Cost = Rs 440", visual: { type: "basic", radius: "r = 14 m", caption: "Rs 5 per m", caption2: "Find cost" } },
        { topic: "Inscribed Square", question: "A square is inscribed in a circle of radius 7 cm. Find the area of the square.", options: ["49 cm^2", "77 cm^2", "98 cm^2", "154 cm^2"], correctAnswer: 2, explanation: "Square diagonal equals circle diameter = 14 cm. Area of square = diagonal^2 / 2 = 196 / 2 = 98 cm^2.", solution: "Square area = 98 cm^2", visual: { type: "square-circle", mode: "square-inside", radius: "r = 7 cm", caption: "Square area ?" } },
        { topic: "Inscribed Circle", question: "A circle is inscribed in a square of side 14 cm. Find the area of the circle.", options: ["44 cm^2", "98 cm^2", "154 cm^2", "196 cm^2"], correctAnswer: 2, explanation: "Diameter of inscribed circle equals square side = 14 cm, so radius = 7 cm. Area = 154 cm^2.", solution: "Circle area = 154 cm^2", visual: { type: "square-circle", side: "Side = 14 cm", caption: "Circle area ?" } },
        { topic: "Number of Tangents", question: "Point P lies exactly on the given circle. How many tangents can be drawn from P?", options: ["0", "1", "2", "Infinite"], correctAnswer: 1, explanation: "Exactly one tangent can be drawn at a point lying on a circle.", solution: "One tangent", visual: { type: "tangent", radius: "OT", pt: "At T = P", caption: "P on circle" } },
        { topic: "Two Tangents Angle", question: "Tangents PA and PB touch a circle and angle AOB at the center is 110 deg. Find angle APB.", options: ["55 deg", "70 deg", "90 deg", "110 deg"], correctAnswer: 1, explanation: "Angle between two tangents = 180 - angle between the radii = 180 - 110 = 70 deg.", solution: "Angle APB = 70 deg", visual: { type: "two-tangents", angle: 110, centerAngle: "110 deg", outerAngle: "?" } },
        { topic: "Minor Arc", question: "A minor arc in a circle of radius 21 cm subtends 60 deg at the center. Find its length.", options: ["11 cm", "22 cm", "33 cm", "44 cm"], correctAnswer: 1, explanation: "Arc length = 60/360 x 2 x 22/7 x 21 = 22 cm.", solution: "Arc length = 22 cm", visual: { type: "sector", angle: 60, radius: "r = 21 cm", caption: "Minor arc ?" } },
        { topic: "Remaining Circle Area", question: "A quadrant is removed from a circle of radius 14 cm. Find the area of the remaining three-quarter region.", options: ["154 cm^2", "308 cm^2", "462 cm^2", "616 cm^2"], correctAnswer: 2, explanation: "Full area = 616 cm^2. Remaining area = 3/4 x 616 = 462 cm^2.", solution: "Remaining area = 462 cm^2", visual: { type: "shaded", angle: 270, radius: "r = 14 cm", caption: "Shaded remainder" } },
        { topic: "Area Ratio", question: "Two circles have radii 3 cm and 5 cm as shown. What is the ratio of their areas (smaller : larger)?", options: ["3:5", "5:3", "9:25", "25:9"], correctAnswer: 2, explanation: "Areas are proportional to squares of radii. Ratio = 3^2 : 5^2 = 9 : 25.", solution: "Area ratio = 9:25", visual: { type: "two-circles", r1: "5 cm", r2: "3 cm", distance: "Compare areas" } }
    ];

    const questions = records.map((record, index) => ({
        id: `${quizId}-q${String(index + 1).padStart(2, "0")}`,
        topic: record.topic,
        difficulty: "medium",
        question: record.question,
        image: asImage(record, false),
        options: record.options,
        correctAnswer: record.correctAnswer,
        explanation: record.explanation,
        explanationImage: asImage(record, true)
    }));

    window.GJU_QUIZ_BANK.push({
        id: quizId,
        subject: "Mathematics",
        title: "Mathematics Circle Image Based Practice Set 1",
        description: "50 unique diagram-based Circle questions covering arcs, sectors, chords, tangents and circular applications.",
        durationMinutes: 40,
        totalQuestions: questions.length,
        marksPerQuestion: 1,
        negativeMarks: 0.25,
        difficulty: "Moderate",
        tags: ["Circle", "Image Based", "Geometry", "SSC", "Police"],
        questions
    });
}());
