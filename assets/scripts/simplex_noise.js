/**
 * Bundled by jsDelivr using Rollup v2.79.1 and Terser v5.19.2.
 * Original file: /npm/simplex-noise@2.4.0/simplex-noise.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
var r, t, a = { exports: {} };
r = a,
  t = a.exports,
  function () {
    var a = .5 * (Math.sqrt(3) - 1),
      e = (3 - Math.sqrt(3)) / 6,
      o = 1 / 6,
      i = (Math.sqrt(5) - 1) / 4,
      n = (5 - Math.sqrt(5)) / 20;
    function s(r) {
      var t;
      t = "function" == typeof r ? r : r
        ? function () {
          var r,
            t = 0,
            a = 0,
            e = 0,
            o = 1,
            i = (r = 4022871197, function (t) {
              t = t.toString();
              for (var a = 0; a < t.length; a++) {
                var e = .02519603282416938 * (r += t.charCodeAt(a));
                e -= r = e >>> 0,
                  r = (e *= r) >>> 0,
                  r += 4294967296 * (e -= r);
              }
              return 2.3283064365386963e-10 * (r >>> 0);
            });
          t = i(" "), a = i(" "), e = i(" ");
          for (var n = 0; n < arguments.length; n++) {
            (t -= i(arguments[n])) < 0 && (t += 1),
              (a -= i(arguments[n])) < 0 && (a += 1),
              (e -= i(arguments[n])) < 0 && (e += 1);
          }
          return i = null, function () {
            var r = 2091639 * t + 2.3283064365386963e-10 * o;
            return t = a, a = e, e = r - (o = 0 | r);
          };
        }(r)
        : Math.random,
        this.p = v(t),
        this.perm = new Uint8Array(512),
        this.permMod12 = new Uint8Array(512);
      for (var a = 0; a < 512; a++) {
        this.perm[a] = this.p[255 & a], this.permMod12[a] = this.perm[a] % 12;
      }
    }
    function v(r) {
      var t, a = new Uint8Array(256);
      for (t = 0; t < 256; t++) a[t] = t;
      for (t = 0; t < 255; t++) {
        var e = t + ~~(r() * (256 - t)), o = a[t];
        a[t] = a[e], a[e] = o;
      }
      return a;
    }
    s.prototype = {
      grad3: new Float32Array([
        1,
        1,
        0,
        -1,
        1,
        0,
        1,
        -1,
        0,
        -1,
        -1,
        0,
        1,
        0,
        1,
        -1,
        0,
        1,
        1,
        0,
        -1,
        -1,
        0,
        -1,
        0,
        1,
        1,
        0,
        -1,
        1,
        0,
        1,
        -1,
        0,
        -1,
        -1,
      ]),
      grad4: new Float32Array([
        0,
        1,
        1,
        1,
        0,
        1,
        1,
        -1,
        0,
        1,
        -1,
        1,
        0,
        1,
        -1,
        -1,
        0,
        -1,
        1,
        1,
        0,
        -1,
        1,
        -1,
        0,
        -1,
        -1,
        1,
        0,
        -1,
        -1,
        -1,
        1,
        0,
        1,
        1,
        1,
        0,
        1,
        -1,
        1,
        0,
        -1,
        1,
        1,
        0,
        -1,
        -1,
        -1,
        0,
        1,
        1,
        -1,
        0,
        1,
        -1,
        -1,
        0,
        -1,
        1,
        -1,
        0,
        -1,
        -1,
        1,
        1,
        0,
        1,
        1,
        1,
        0,
        -1,
        1,
        -1,
        0,
        1,
        1,
        -1,
        0,
        -1,
        -1,
        1,
        0,
        1,
        -1,
        1,
        0,
        -1,
        -1,
        -1,
        0,
        1,
        -1,
        -1,
        0,
        -1,
        1,
        1,
        1,
        0,
        1,
        1,
        -1,
        0,
        1,
        -1,
        1,
        0,
        1,
        -1,
        -1,
        0,
        -1,
        1,
        1,
        0,
        -1,
        1,
        -1,
        0,
        -1,
        -1,
        1,
        0,
        -1,
        -1,
        -1,
        0,
      ]),
      noise2D: function (r, t) {
        var o,
          i,
          n = this.permMod12,
          s = this.perm,
          v = this.grad3,
          f = 0,
          h = 0,
          l = 0,
          p = (r + t) * a,
          u = Math.floor(r + p),
          M = Math.floor(t + p),
          d = (u + M) * e,
          m = r - (u - d),
          c = t - (M - d);
        m > c ? (o = 1, i = 0) : (o = 0, i = 1);
        var g = m - o + e,
          x = c - i + e,
          y = m - 1 + 2 * e,
          A = c - 1 + 2 * e,
          w = 255 & u,
          b = 255 & M,
          q = .5 - m * m - c * c;
        if (q >= 0) {
          var D = 3 * n[w + s[b]];
          f = (q *= q) * q * (v[D] * m + v[D + 1] * c);
        }
        var U = .5 - g * g - x * x;
        if (U >= 0) {
          var F = 3 * n[w + o + s[b + i]];
          h = (U *= U) * U * (v[F] * g + v[F + 1] * x);
        }
        var P = .5 - y * y - A * A;
        if (P >= 0) {
          var S = 3 * n[w + 1 + s[b + 1]];
          l = (P *= P) * P * (v[S] * y + v[S + 1] * A);
        }
        return 70 * (f + h + l);
      },
      noise3D: function (r, t, a) {
        var e,
          i,
          n,
          s,
          v,
          f,
          h,
          l,
          p,
          u,
          M = this.permMod12,
          d = this.perm,
          m = this.grad3,
          c = .3333333333333333 * (r + t + a),
          g = Math.floor(r + c),
          x = Math.floor(t + c),
          y = Math.floor(a + c),
          A = (g + x + y) * o,
          w = r - (g - A),
          b = t - (x - A),
          q = a - (y - A);
        w >= b
          ? b >= q
            ? (v = 1, f = 0, h = 0, l = 1, p = 1, u = 0)
            : w >= q
            ? (v = 1, f = 0, h = 0, l = 1, p = 0, u = 1)
            : (v = 0, f = 0, h = 1, l = 1, p = 0, u = 1)
          : b < q
          ? (v = 0, f = 0, h = 1, l = 0, p = 1, u = 1)
          : w < q
          ? (v = 0, f = 1, h = 0, l = 0, p = 1, u = 1)
          : (v = 0, f = 1, h = 0, l = 1, p = 1, u = 0);
        var D = w - v + o,
          U = b - f + o,
          F = q - h + o,
          P = w - l + 2 * o,
          S = b - p + 2 * o,
          T = q - u + 2 * o,
          _ = w - 1 + .5,
          C = b - 1 + .5,
          N = q - 1 + .5,
          j = 255 & g,
          k = 255 & x,
          z = 255 & y,
          B = .6 - w * w - b * b - q * q;
        if (B < 0) e = 0;
        else {
          var E = 3 * M[j + d[k + d[z]]];
          e = (B *= B) * B * (m[E] * w + m[E + 1] * b + m[E + 2] * q);
        }
        var G = .6 - D * D - U * U - F * F;
        if (G < 0) i = 0;
        else {
          var H = 3 * M[j + v + d[k + f + d[z + h]]];
          i = (G *= G) * G * (m[H] * D + m[H + 1] * U + m[H + 2] * F);
        }
        var I = .6 - P * P - S * S - T * T;
        if (I < 0) n = 0;
        else {
          var J = 3 * M[j + l + d[k + p + d[z + u]]];
          n = (I *= I) * I * (m[J] * P + m[J + 1] * S + m[J + 2] * T);
        }
        var K = .6 - _ * _ - C * C - N * N;
        if (K < 0) s = 0;
        else {
          var L = 3 * M[j + 1 + d[k + 1 + d[z + 1]]];
          s = (K *= K) * K * (m[L] * _ + m[L + 1] * C + m[L + 2] * N);
        }
        return 32 * (e + i + n + s);
      },
      noise4D: function (r, t, a, e) {
        var o,
          s,
          v,
          f,
          h,
          l,
          p,
          u,
          M,
          d,
          m,
          c,
          g,
          x,
          y,
          A,
          w,
          b = this.perm,
          q = this.grad4,
          D = (r + t + a + e) * i,
          U = Math.floor(r + D),
          F = Math.floor(t + D),
          P = Math.floor(a + D),
          S = Math.floor(e + D),
          T = (U + F + P + S) * n,
          _ = r - (U - T),
          C = t - (F - T),
          N = a - (P - T),
          j = e - (S - T),
          k = 0,
          z = 0,
          B = 0,
          E = 0;
        _ > C ? k++ : z++,
          _ > N ? k++ : B++,
          _ > j ? k++ : E++,
          C > N ? z++ : B++,
          C > j ? z++ : E++,
          N > j ? B++ : E++;
        var G = _ - (l = k >= 3 ? 1 : 0) + n,
          H = C - (p = z >= 3 ? 1 : 0) + n,
          I = N - (u = B >= 3 ? 1 : 0) + n,
          J = j - (M = E >= 3 ? 1 : 0) + n,
          K = _ - (d = k >= 2 ? 1 : 0) + 2 * n,
          L = C - (m = z >= 2 ? 1 : 0) + 2 * n,
          O = N - (c = B >= 2 ? 1 : 0) + 2 * n,
          Q = j - (g = E >= 2 ? 1 : 0) + 2 * n,
          R = _ - (x = k >= 1 ? 1 : 0) + 3 * n,
          V = C - (y = z >= 1 ? 1 : 0) + 3 * n,
          W = N - (A = B >= 1 ? 1 : 0) + 3 * n,
          X = j - (w = E >= 1 ? 1 : 0) + 3 * n,
          Y = _ - 1 + 4 * n,
          Z = C - 1 + 4 * n,
          $ = N - 1 + 4 * n,
          rr = j - 1 + 4 * n,
          tr = 255 & U,
          ar = 255 & F,
          er = 255 & P,
          or = 255 & S,
          ir = .6 - _ * _ - C * C - N * N - j * j;
        if (ir < 0) o = 0;
        else {
          var nr = b[tr + b[ar + b[er + b[or]]]] % 32 * 4;
          o = (ir *= ir) * ir *
            (q[nr] * _ + q[nr + 1] * C + q[nr + 2] * N + q[nr + 3] * j);
        }
        var sr = .6 - G * G - H * H - I * I - J * J;
        if (sr < 0) s = 0;
        else {
          var vr = b[tr + l + b[ar + p + b[er + u + b[or + M]]]] % 32 * 4;
          s = (sr *= sr) * sr *
            (q[vr] * G + q[vr + 1] * H + q[vr + 2] * I + q[vr + 3] * J);
        }
        var fr = .6 - K * K - L * L - O * O - Q * Q;
        if (fr < 0) v = 0;
        else {
          var hr = b[tr + d + b[ar + m + b[er + c + b[or + g]]]] % 32 * 4;
          v = (fr *= fr) * fr *
            (q[hr] * K + q[hr + 1] * L + q[hr + 2] * O + q[hr + 3] * Q);
        }
        var lr = .6 - R * R - V * V - W * W - X * X;
        if (lr < 0) f = 0;
        else {
          var pr = b[tr + x + b[ar + y + b[er + A + b[or + w]]]] % 32 * 4;
          f = (lr *= lr) * lr *
            (q[pr] * R + q[pr + 1] * V + q[pr + 2] * W + q[pr + 3] * X);
        }
        var ur = .6 - Y * Y - Z * Z - $ * $ - rr * rr;
        if (ur < 0) h = 0;
        else {
          var Mr = b[tr + 1 + b[ar + 1 + b[er + 1 + b[or + 1]]]] % 32 * 4;
          h = (ur *= ur) * ur *
            (q[Mr] * Y + q[Mr + 1] * Z + q[Mr + 2] * $ + q[Mr + 3] * rr);
        }
        return 27 * (o + s + v + f + h);
      },
    },
      s._buildPermutationTable = v,
      t.SimplexNoise = s,
      r.exports = s;
  }();
var e = a.exports,
  o = a.exports._buildPermutationTable,
  i = a.exports.prototype;
export { e as default, i as prototype, o as _buildPermutationTable };
//# sourceMappingURL=/sm/a5fc6641c3ffd15afbbd8ae5699ab206acc2b700418a5f6bcb337ec97c5907c2.map
