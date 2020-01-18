import React, { useState } from "react";
import { Link } from "react-router-dom";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

import "./Shimming.scss";

import printConfigImage from "../../assets/printconfig.PNG";

export default function Shimming() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [texto, setTexto] = useState([]);
  const [lines0112, setLines0112] = useState([]);
  const [lines1324, setLines1324] = useState([]);
  const [lines2536, setLines2536] = useState([]);

  const handleClose = bool => {
    setOpen(false);
    if (bool) {
      setTimeout(() => {
        window.print();
      }, 500);
    }
  };

  const readFile = e => {
    e.preventDefault();
    if (
      e.target.files[0].name
        .split(".")
        .pop()
        .toLowerCase() === "psm"
    ) {
      const reader = new FileReader();
      reader.onload = function() {
        processText(reader.result);
      };
      reader.readAsText(e.target.files[0]);
    } else {
      alert("Please provide a valid PSM file");
    }
  };

  const processText = txt => {
    var eachLine = txt.split("\n");
    let linedelineas = [];
    let finTexto = [];
    for (var i = 0, l = eachLine.length; i < l; i++) {
      // Identificar en donde acaba el texto
      if (eachLine[i].startsWith("1")) {
        finTexto.push(i);
      }
      // identificar el ------------------------------ y guardarlo
      if (eachLine[i].startsWith("-", 2)) {
        linedelineas.push(i);
      }
    }
    // Separar y guardarlos en arr diferentes
    let textoArr = [];
    let totalQ0112 = [];
    let totalQ1324 = [];
    let totalQ2536 = [];
    let increQ0112 = [];
    let increQ1324 = [];
    let increQ2536 = [];
    for (let i = 0; i < finTexto[0]; i++) {
      textoArr.push(eachLine[i]);
    }
    for (let i = linedelineas[3] + 1; i <= linedelineas[3] + 45; i++) {
      totalQ0112.push(eachLine[i]);
    }
    for (let i = linedelineas[4] + 1; i <= linedelineas[4] + 45; i++) {
      totalQ1324.push(eachLine[i]);
    }
    for (let i = linedelineas[5] + 1; i <= linedelineas[5] + 45; i++) {
      totalQ2536.push(eachLine[i]);
    }
    for (let i = linedelineas[6] + 1; i <= linedelineas[6] + 45; i++) {
      increQ0112.push(eachLine[i]);
    }
    for (let i = linedelineas[7] + 1; i <= linedelineas[7] + 45; i++) {
      increQ1324.push(eachLine[i]);
    }
    for (let i = linedelineas[8] + 1; i <= linedelineas[8] + 45; i++) {
      increQ2536.push(eachLine[i]);
    }
    // Quitarles los espacios
    let totalQ0112cl = [];
    let totalQ1324cl = [];
    let totalQ2536cl = [];
    let increQ0112cl = [];
    let increQ1324cl = [];
    let increQ2536cl = [];

    totalQ0112cl = convertArray(totalQ0112);
    totalQ1324cl = convertArray(totalQ1324);
    totalQ2536cl = convertArray(totalQ2536);
    increQ0112cl = convertArray(increQ0112);
    increQ1324cl = convertArray(increQ1324);
    increQ2536cl = convertArray(increQ2536);

    let print0112 = [];
    let print1324 = [];
    let print2536 = [];

    // Combinar arrays
    print0112 = combineArrays(totalQ0112cl, increQ0112cl);
    print1324 = combineArrays(totalQ1324cl, increQ1324cl);
    print2536 = combineArrays(totalQ2536cl, increQ2536cl);
    // Desplegar los datos
    setTexto(textoArr);
    setLines0112(print0112);
    setLines1324(print1324);
    setLines2536(print2536);
    setShow(true);
  };

  const combineArrays = (total, incre) => {
    let result = [];
    for (let i = 0; i < total.length; i++) {
      result.push([]);
      for (let j = 0; j <= 132; j++) {
        if (j === 0 || j === 13) {
          result[i].push(i + 1);
        } else {
          result[i].push(total[i][j]);
          result[i].push(incre[i][j]);
        }
      }
    }
    return result;
  };

  const convertArray = arr1 => {
    let tempArray = [];
    let result = [];
    for (let i = 0; i < arr1.length; i++) {
      tempArray[i] = arr1[i].split(" ");
      result.push([]);
    }
    for (let i = 0; i < tempArray.length; i++) {
      for (let j = 0; j < tempArray[i].length; j++) {
        if (tempArray[i][j] !== "") {
          result[i].push(tempArray[i][j]);
        }
      }
    }
    return result;
  };
  const print = () => {
    setOpen(true);
  };

  return (
    <div className="shimming">
      <div className="upperbar">
        <Link className="return" to="/mr">
          Return
        </Link>
        <div className="title">Passive shimming printing tool</div>
      </div>
      <div className="container">
        <div className="input">
          <input
            className="inputFile"
            type="file"
            id="file-input"
            onChange={async e => readFile(e)}
          />
          <label className="file-input__label" htmlFor="file-input">
            {show ? (
              <span>Upload a new psm file</span>
            ) : (
              <span>Upload psm file</span>
            )}
          </label>
          {show ? (
            <div>
              <button className="printBtn" onClick={() => print()}>
                Print
              </button>
            </div>
          ) : null}
        </div>
        {show ? (
          <div className="printarea">
            <div className="textContainer">
              <div className="textArea">
                {texto &&
                  texto.map((line, i) => {
                    return (
                      <pre
                        key={i}
                        className={
                          line.trim().endsWith("OUT OF SPEC")
                            ? "red"
                            : line.trim().endsWith("IN SPEC")
                            ? "green"
                            : ""
                        }
                      >
                        {line}
                      </pre>
                    );
                  })}
              </div>
            </div>
            <div className="s0112 section">
              <div className="barnumbers">
                <span></span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
                <span>9</span>
                <span>10</span>
                <span>11</span>
                <span>12</span>
                <span></span>
              </div>
              <div className="data">
                {lines0112 &&
                  lines0112.map((line, i) => (
                    <ul key={i}>
                      {line.map((char, j) => (
                        <li
                          key={j}
                          className={
                            j === 0
                              ? "number"
                              : j === 25
                              ? "number"
                              : j % 2
                              ? "even"
                              : "odd"
                          }
                        >
                          <div
                            className={
                              j % 2
                                ? ""
                                : j === 0 || char === "-"
                                ? ""
                                : char < 0
                                ? "red"
                                : "green"
                            }
                          >
                            {char}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ))}
              </div>
            </div>
            <div className="s1324 section">
              <div className="barnumbers">
                <span></span>
                <span>13</span>
                <span>14</span>
                <span>15</span>
                <span>16</span>
                <span>17</span>
                <span>18</span>
                <span>19</span>
                <span>20</span>
                <span>21</span>
                <span>22</span>
                <span>23</span>
                <span>24</span>
                <span></span>
              </div>
              <div className="data">
                {lines1324 &&
                  lines1324.map((line, i) => (
                    <ul key={i}>
                      {line.map((char, j) => (
                        <li
                          key={j}
                          className={
                            j === 0
                              ? "number"
                              : j === 25
                              ? "number"
                              : j % 2
                              ? "even"
                              : "odd"
                          }
                        >
                          <div
                            className={
                              j % 2
                                ? ""
                                : j === 0 || char === "-"
                                ? ""
                                : char < 0
                                ? "red"
                                : "green"
                            }
                          >
                            {char}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ))}
              </div>
            </div>
            <div className="s2536 section">
              <div className="barnumbers">
                <span></span>
                <span>25</span>
                <span>26</span>
                <span>27</span>
                <span>28</span>
                <span>29</span>
                <span>30</span>
                <span>31</span>
                <span>32</span>
                <span>33</span>
                <span>34</span>
                <span>35</span>
                <span>36</span>
                <span></span>
              </div>
              <div className="data">
                {lines2536 &&
                  lines2536.map((line, i) => (
                    <ul key={i}>
                      {line.map((char, j) => (
                        <li
                          key={j}
                          className={
                            j === 0
                              ? "number"
                              : j === 25
                              ? "number"
                              : j % 2
                              ? "even"
                              : "odd"
                          }
                        >
                          <div
                            className={
                              j % 2
                                ? ""
                                : j === 0 || char === "-"
                                ? ""
                                : char < 0
                                ? "red"
                                : "green"
                            }
                          >
                            {char}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <PrintDialog open={open} onClose={handleClose} />
    </div>
  );
}

// Modal
function PrintDialog(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };
  const handlePrint = () => {
    onClose(true);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      className="dialogOK"
    >
      <DialogTitle>Remember!</DialogTitle>
      <p>
        In order to get the CORRECT page configuration, make sure you have your
        PDF printer configuration like this
      </p>
      <img src={printConfigImage} alt="Print config" className="printImg" />
      <button className="okbtn" onClick={() => handlePrint()}>
        OK
      </button>
    </Dialog>
  );
}
