(this.webpackJsonpcheckers=this.webpackJsonpcheckers||[]).push([[0],{11:function(e,i,t){},12:function(e,i,t){},14:function(e,i,t){"use strict";t.r(i);var o=t(1),n=t.n(o),r=t(6),c=t.n(r),l=(t(11),t(12),t(3)),s=t(2);var a=t(0);function u(e){var i,t,o=e.square.position.row===(null===(i=e.startingSquare)||void 0===i?void 0:i.position.row)&&e.square.position.col===(null===(t=e.startingSquare)||void 0===t?void 0:t.position.col)&&e.firstMove,n=e.moves.length>0;return Object(a.jsx)("button",{"data-testid":"checkers-square",className:e.square.highlighted?"square highlighted":"black"===e.square.color?"square dark":"square",onClick:function(){if(o)e.selectStartingSquare(null),e.selectSquare(null),e.selectPiece(null),e.setFirstMove(!0);else if(n){var i,t=Object(s.a)(e.moves);try{for(t.s();!(i=t.n()).done;){var r=i.value;if(r.destination.position.row===e.square.position.row&&r.destination.position.col===e.square.position.col)if(null===r.destination.piece){if(e.movePiece(r),e.setFirstMove(!1),0!==r.destination.position.row||"red"!==e.selectedPiece.color||e.selectedPiece.king)if(7!==r.destination.position.row||"black"!==e.selectedPiece.color||e.selectedPiece.king)e.selectSquare(r.destination),e.selectStartingSquare(r.destination);else{var c={color:"black",king:!0},l={position:r.destination.position,color:r.destination.color,highlighted:r.destination.highlighted,piece:c};e.selectStartingSquare(l),e.selectPiece(c),e.selectSquare(l)}else{var a={color:"red",king:!0},u={position:r.destination.position,color:r.destination.color,highlighted:r.destination.highlighted,piece:a};e.selectStartingSquare(u),e.selectPiece(a),e.selectSquare(u)}r.endsTurn&&e.endTurn()}else e.selectSquare(e.square)}}catch(d){t.e(d)}finally{t.f()}}else e.selectStartingSquare(e.square),e.selectSquare(e.square),e.selectPiece(e.square.piece)},disabled:n?!o&&!e.square.highlighted:!(null!==e.square.piece&&(e.redsTurn&&"red"===e.square.piece.color||!e.redsTurn&&"black"===e.square.piece.color)),children:e.child},e.square.position.col)}function d(e,i,t){var o=[{row:e.position.row-1,col:e.position.col-1},{row:e.position.row-1,col:e.position.col+1}],n=[{row:e.position.row+1,col:e.position.col-1},{row:e.position.row+1,col:e.position.col+1}],r=o.concat(n),c=new Array;if(void 0===t&&null===e.piece)throw Error("No piece to get targets of!");void 0===t&&(t=e.piece);var l=new Array;c=t.king?r:"red"===t.color?o:n;var a,u=Object(s.a)(c);try{for(u.s();!(a=u.n()).done;){var d=a.value;d.row>=0&&d.row<=7&&d.col>=0&&d.col<=7&&l.push(i[d.row][d.col])}}catch(p){u.e(p)}finally{u.f()}return l}function p(e,i,t){if(null===e)return[];if(null===e.piece&&void 0===t)throw Error("No piece to move!");return void 0===t&&(t=e.piece),d(e,i,t).filter((function(e){return null!==e.piece&&e.piece.color!==t.color}))}function h(e,i,t){return null==e||null===e.piece?[]:d(e,i,t).filter((function(e){return null===e.piece}))}function f(e){var i=function(){var e=Object(o.useState)((function(){for(var e=new Array(8),i=0;i<8;i++){for(var t=new Array(8),o=0;o<8;o++){var n=i%2!==o%2?"black":"white",r="red";if(i<3){r="black";var c="black"===n?{color:r,king:!1}:null;t[o]={position:{row:i,col:o},piece:c,color:n,highlighted:!1}}else if(i>4){var l="black"===n?{color:r,king:!1}:null;t[o]={position:{row:i,col:o},piece:l,color:n,highlighted:!1}}else t[o]={position:{row:i,col:o},piece:null,color:n,highlighted:!1}}e[i]=t}return e})),i=Object(l.a)(e,2),t=i[0],n=i[1];return[t,function(e,i){var o=(new Array).concat(t);if(null!==i.destination.piece)throw Error("Tried to move to an occupied space!");if(null===e)return null;o[i.destination.position.row][i.destination.position.col].piece=e.piece,o[e.position.row][e.position.col].piece=null,null!==i.deletes&&(o[i.deletes.position.row][i.deletes.position.col].piece=null);var r,c=Object(s.a)(o);try{for(c.s();!(r=c.n()).done;){var l,a=r.value,u=Object(s.a)(a);try{for(u.s();!(l=u.n()).done;)l.value.highlighted=!1}catch(q){u.e(q)}finally{u.f()}}}catch(q){c.e(q)}finally{c.f()}(0!==i.destination.position.row||"red"!==o[i.destination.position.row][i.destination.position.col].piece.color||o[i.destination.position.row][i.destination.position.col].piece.king)&&(7!==i.destination.position.row||"black"!==o[i.destination.position.row][i.destination.position.col].piece.color||o[i.destination.position.row][i.destination.position.col].piece.king)||(o[i.destination.position.row][i.destination.position.col].piece.king=!0);var d=!1,f=!1;n(o);var g,v=Object(s.a)(o);try{for(v.s();!(g=v.n()).done;){var b,j=g.value,w=Object(s.a)(j);try{var O=function(){var e=b.value;if(e.piece){var i=new Array;(i=(i=i.concat(h(e,o))).concat(p(e,o).filter((function(i){return h(i,o,e.piece).length>0})))).length>0&&"red"===e.piece.color?d=!0:i.length>0&&(f=!0)}};for(w.s();!(b=w.n()).done;)O()}catch(q){w.e(q)}finally{w.f()}}}catch(q){v.e(q)}finally{v.f()}var k=null;return d||f?d?f||(k="red"):k="black":k="tie",k},function(e,i){var o,r=(new Array).concat(t),c=Object(s.a)(e);try{for(c.s();!(o=c.n()).done;){var l=o.value;r[l.position.row][l.position.col].highlighted=i}}catch(a){c.e(a)}finally{c.f()}n(r)}]}(),t=Object(l.a)(i,3),n=t[0],r=t[1],c=t[2],d=Object(o.useState)(null),f=Object(l.a)(d,2),g=f[0],v=f[1],b=Object(o.useState)(!0),j=Object(l.a)(b,2),w=j[0],O=j[1],k=Object(o.useState)(!0),q=Object(l.a)(k,2),S=q[0],y=q[1],m=Object(o.useState)(null),x=Object(l.a)(m,2),P=x[0],T=x[1],A=Object(o.useState)(null),F=Object(l.a)(A,2),M=F[0],N=F[1],C=Object(o.useState)(null),E=Object(l.a)(C,2),L=E[0],B=E[1],I=function(e){for(var i=new Array(64),t=0;t<64;t++)i[t]=n[Math.floor(t/8)][t%8];c(i,!1),v(e)},J=function(e){O(!e),y(!0),I(null),N(null),T(null);for(var i=new Array(64),t=0;t<64;t++)i[t]=n[Math.floor(t/8)][t%8];c(i,!1)},D=new Array;if(null!==g&&null!==P&&null!==M)if((S||g.piece!==P)&&(D=D.concat(h(g,n,P).map((function(e){return{destination:e,deletes:g.piece.color!==P.color?g:null,endsTurn:g.piece===P}}))).filter((function(e){return e.destination.position.row!==M.position.row||e.destination.position.col!==M.position.col}))),g.piece!==P&&null!==g.piece||(D=D.concat(p(g,n,P).filter((function(e){return h(e,n,P).filter((function(e){return e.position.row!==g.position.row||e.position.col!==g.position.col})).length>0})).map((function(e){return{destination:e,deletes:null,endsTurn:!1}})))),0===D.length&&S)N(null),I(null),T(null);else if(0===D.length)J(w);else{var H,z=Object(s.a)(D);try{for(z.s();!(H=z.n()).done;){var G=H.value;n[G.destination.position.row][G.destination.position.col].highlighted||c([G.destination],!0)}}catch(K){z.e(K)}finally{z.f()}}return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)("p",{children:L?"".concat(L," wins!"):w?"red's turn":"black's turn"}),Object(a.jsx)("div",{className:"container",children:n.map((function(e,i){return Object(a.jsx)("div",{"data-testid":"checkers-row",className:"board-row",children:e.map((function(e,t){var o={square:n[i][t],redsTurn:w,moves:D,selectSquare:I,movePiece:function(e){B(r(M,e))},firstMove:S,setFirstMove:y,selectPiece:T,selectedPiece:P,startingSquare:M,selectStartingSquare:N,endTurn:function(){J(w)},child:Object(a.jsx)(a.Fragment,{})};return null!==e.piece&&"black"===e.piece.color?(o.child=Object(a.jsx)("span",{className:"piece","data-testid":"black-piece",children:e.piece.king?"*":""}),u(o)):null!==e.piece&&"red"===e.piece.color?(o.child=Object(a.jsx)("span",{className:"piece red","data-testid":"red-piece",children:e.piece.king?"*":""}),u(o)):u(o)}))},i)}))})]})}function g(e){return Object(a.jsxs)("section",{children:[Object(a.jsx)(f,{}),Object(a.jsxs)("footer",{children:[Object(a.jsx)("p",{children:Object(a.jsx)("a",{href:"https://lukerd-29-00.github.io/Portfolio/",children:"Homepage"})}),Object(a.jsx)("p",{children:Object(a.jsx)("a",{href:"https://github.com/Lukerd-29-00/Checkers",children:"Source code"})}),Object(a.jsx)("p",{children:Object(a.jsx)("a",{href:"https://github.com/Lukerd-29-00/Portfolio",children:"Main repository"})})]})]})}var v=function(){return Object(a.jsx)(g,{})},b=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,15)).then((function(i){var t=i.getCLS,o=i.getFID,n=i.getFCP,r=i.getLCP,c=i.getTTFB;t(e),o(e),n(e),r(e),c(e)}))};c.a.render(Object(a.jsx)(n.a.StrictMode,{children:Object(a.jsx)(v,{})}),document.getElementById("root")),b()}},[[14,1,2]]]);
//# sourceMappingURL=main.0611d98e.chunk.js.map