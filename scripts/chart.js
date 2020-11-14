let beam = 0;
let functionObj = [
  {
    momentDomain: (q, l) => {
      return (q * l * l) / 8;
    },
    shearDomain: (q, l) => {
      return (q * l) / 2;
    },
    momentFunction: (q, l) => {
      return `-((${q} * x * x) / 2 - (${q} * ${l} * x) / 2)`;
    },
    shearFunction: (q, l) => {
      return `-((${q} * x) - (${q} * ${l}) / 2)`;
    },
  },
  {
    momentDomain: (q, l) => {
      return (q * l * l) / 9 / Math.sqrt(3);
    },
    shearDomain: (q, l) => {
      return (q * l) / 3;
    },
    momentFunction: (q, l) => {
      return `-((${q}*x*x*x/6/${l}) - (${q}*x*${l}/6))`;
    },
    shearFunction: (q, l) => {
      return `-(${q}*x*x/2/${l} - ${q}*${l}/6)`;
    },
  },
  {
    momentDomain: (q, l) => {
      return q;
    },
    shearDomain: (q, l) => {
      return q / l;
    },
    momentFunction: (q, l) => {
      return `-(${q}/${l}*(x - ${l}))`;
    },
    shearFunction: (q, l) => {
      return `-(${q}/${l})`;
    },
  },
  {
    momentDomain: (q, l) => {
      return (q * l * l) / 2;
    },
    shearDomain: (q, l) => {
      return q * l;
    },
    momentFunction: (q, l) => {
      return `-(${q}/2*(${l}*${l} - 2*${l}*x + x*x))`;
    },
    shearFunction: (q, l) => {
      return `-(${q} * (x - ${l}))`;
    },
  },
  {
    momentDomain: (q, l) => {
      return q * l;
    },
    shearDomain: (q, l) => {
      return q;
    },
    momentFunction: (q, l) => {
      return `${q}*(x-${l})`;
    },
    shearFunction: (q, l) => {
      return `${q}`;
    },
  },
  {
    momentDomain: (q, l) => {
      return (q * l * l) / 6;
    },
    shearDomain: (q, l) => {
      return (q * l) / 2;
    },
    momentFunction: (q, l) => {
      return `-(${q}/6/${l})*(${l}*${l}*${l} - 3*${l}*${l}*x + 3*${l}*x*x - x*x*x)`;
    },
    shearFunction: (q, l) => {
      return `(${q}/2/${l})*(${l}*${l} - 2*${l}*x + x*x)`;
    },
  },
];
for (let i = 0; i < 6; i++) {
  document.getElementById(`expend-${i + 1}`).addEventListener("click", () => {
    beam = i;
    if (i === 4) {
      document.querySelector(".qLabel").textContent = "P (kN)";
    } else if (i === 2) {
      document.querySelector(".qLabel").textContent = "M (kN-m)";
    } else {
      document.querySelector(".qLabel").textContent = "q (kN / m)";
    }
    document.querySelector(".dimage").innerHTML = `<img src="./images/simple-${
      i + 1
    }.png" alt="image" />`;
  });
}

document.querySelector(".submit").addEventListener("click", () => {
  document.getElementById("momentg").innerHTML = "";
  document.getElementById("shearg").innerHTML = "";

  document.querySelectorAll(".is-danger").forEach((e) => (e.textContent = ""));

  let x1 = document.querySelector(".xInput").value * 1;
  let q2 = document.querySelector(".qInput").value * 1;
  let l3 = document.querySelector(".lInput").value * 1;

  //field validators

  if (!isNaN(x1) * !isNaN(q2) * l3 && x1 <= l3) {
    document.querySelector("input").classList.add("is-success");
    getValue(beam);

    for (let j = 0; j < 2; j++) {
      document.querySelectorAll(".function-plot")[j].removeAttribute("height");
      document.querySelectorAll(".function-plot")[j].removeAttribute("width");
      document
        .querySelectorAll(".function-plot")
        [j].setAttribute("viewBox", "0 0 550 380");
    }

    document.getElementById("graph").style.display = "block";
  } else {
    document.getElementById("graph").style.display = "none";
  }
  if (isNaN(x1) || x1 > l3) {
    document.querySelectorAll("input")[2].classList.add("is-danger");
    document
      .querySelectorAll("input")[2]
      .insertAdjacentHTML(
        "afterend",
        ' <p class="help is-danger">Invalid value of x</p>'
      );
  } else {
    document.querySelectorAll("input")[2].classList.remove("is-danger");
    document.querySelectorAll("input")[2].classList.add("is-success");
  }

  if (isNaN(q2)) {
    document.querySelectorAll("input")[0].classList.add("is-danger");
    document
      .querySelectorAll("input")[0]
      .insertAdjacentHTML(
        "afterend",
        ' <p class="help is-danger">Invalid value</p>'
      );
  } else {
    document.querySelectorAll("input")[0].classList.remove("is-danger");
    document.querySelectorAll("input")[0].classList.add("is-success");
  }
  if (!l3) {
    document.querySelectorAll("input")[1].classList.add("is-danger");
    document
      .querySelectorAll("input")[1]
      .insertAdjacentHTML(
        "afterend",
        ' <p class="help is-danger">Invalid value of L</p>'
      );
  } else {
    document.querySelectorAll("input")[1].classList.remove("is-danger");
    document.querySelectorAll("input")[1].classList.add("is-success");
  }
});

document.getElementById("another").addEventListener("click", () => {
  document.querySelector(".qInput").value = "";
  document.querySelector(".lInput").value = "";
  document.querySelector(".xInput").value = "";
});

const getValue = (b) => {
  let x = document.querySelector(".xInput").value;
  let q = document.querySelector(".qInput").value;
  let l = document.querySelector(".lInput").value;

  document.getElementById("valueX").textContent = x;
  let m = functionObj[b].momentFunction(q, l).replace(/x/g, `${x}`);
  let v = functionObj[b].shearFunction(q, l).replace(/x/g, `${x}`);
  let maxV = functionObj[b].shearDomain(q, l) * 1;
  let maxM = functionObj[b].momentDomain(q, l) * 1;

  m = eval(m) * 1;
  v = eval(v) * 1;

  document.getElementById("valueM").textContent = m.toFixed(2);
  document.getElementById("valueV").textContent = v.toFixed(2);
  document.getElementById("maxM").textContent = maxM.toFixed(2);
  document.getElementById("maxV").textContent = maxV.toFixed(2);

  functionPlot({
    target: "#momentg",
    disableZoom: true,
    yAxis: {
      domain: [
        -functionObj[b].momentDomain(q, l) * 1.2,
        functionObj[b].momentDomain(q, l) * 1.2,
      ],
    }, //max value of M
    xAxis: { domain: [0, l] },
    data: [
      {
        fn: functionObj[b].momentFunction(q, l),
      },
    ],
    grid: true,
  });

  functionPlot({
    target: "#shearg",
    disableZoom: true,
    yAxis: {
      domain: [
        -functionObj[b].shearDomain(q, l) * 1.2,
        functionObj[b].shearDomain(q, l) * 1.2,
      ],
    }, //max value of V
    xAxis: { domain: [0, l] },
    data: [
      {
        fn: functionObj[b].shearFunction(q, l),
      },
    ],
    grid: true,
  });
};
