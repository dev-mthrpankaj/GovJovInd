/*
 * Sheet provider: SSC (Eduquity "cbexams" response sheets), e.g. sscexams.cbexams.com/.../ViewCandResponse.aspx
 * One PART (A, B, C, D) per page. collect() runs inside the candidate's own browser on the exam site
 * (it is copied into the bookmark), so it must stay self-contained, use semicolons and no line comments.
 * Parsing happens on the server: rank-api/includes/response-sheet-cbexams.php
 */
(function () {
    "use strict";
    var list = (window.GovJobSheetProviders = window.GovJobSheetProviders || []);
    list.push({
        id: "ssc-cbexams",
        hosts: "(^|\\.)cbexams\\.com$",
        collect: async function () {
            function sec(h) { var m = /id=["']lblsubject["'][^>]*>([\s\S]*?)<\/span>/i.exec(h); return m ? m[1].replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim() : ""; }
            function ok(h) { return /lblsubject|ViewCandResponse/i.test(h) && !/Just a moment/i.test(h); }
            function hidden(h) { var d = new DOMParser().parseFromString(h, "text/html"), o = {}; d.querySelectorAll("input[type=hidden]").forEach(function (i) { if (i.name) o[i.name] = i.value; }); return o; }
            function btns(h) { var d = new DOMParser().parseFromString(h, "text/html"), o = []; d.querySelectorAll("input[type=submit]").forEach(function (i) { if (/^P\d+$/.test(i.name) && !i.disabled) o.push([i.name, i.value]); }); return o; }
            function get(u) { return fetch(u, { credentials: "include" }).then(function (r) { return r.ok ? r.text() : ""; }).catch(function () { return ""; }); }
            function post(f) { var b = new URLSearchParams(); for (var k in f) b.append(k, f[k]); return fetch(location.pathname + location.search, { method: "POST", credentials: "include", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: b }).then(function (r) { return r.ok ? r.text() : ""; }).catch(function () { return ""; }); }
            var first = document.documentElement.outerHTML;
            var pages = [first], seen = [sec(first)], state = await get(location.href);
            if (!ok(state)) state = first;
            var buttons = btns(first).slice(0, 8);
            for (var i = 0; i < buttons.length; i++) {
                var name = buttons[i][0], val = buttons[i][1], n = parseInt(name.slice(1), 10), h = "";
                var pu = location.href.replace(/ViewCandResponse\d*\.aspx/i, "ViewCandResponse" + (n === 1 ? "" : n) + ".aspx");
                if (pu !== location.href || n !== 1) { var c = await get(pu); if (ok(c) && sec(c) && seen.indexOf(sec(c)) < 0) h = c; }
                if (!h) { var f = hidden(state); f[name] = val; var c2 = await post(f); if (ok(c2)) { state = c2; if (seen.indexOf(sec(c2)) < 0) h = c2; } }
                if (h) { pages.push(h); seen.push(sec(h)); }
            }
            return pages;
        }
    });
}());
