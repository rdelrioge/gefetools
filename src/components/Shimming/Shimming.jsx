import React, { useState } from "react";
import { Link } from "react-router-dom";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

import "./Shimming.scss";

import printConfigImage from "../../assets/printconfig.PNG";

export default function Shimming() {
  const header1 = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];
  const header2 = [
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
  ];
  const header3 = [
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
  ];

  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [texto, setTexto] = useState([]);
  const [lines0112, setLines0112] = useState([]);
  const [lines1324, setLines1324] = useState([]);
  const [lines2536, setLines2536] = useState([]);
  const [toModify, setToModify] = useState([]);

  const handleClose = (bool) => {
    setOpen(false);
    if (bool) {
      setTimeout(() => {
        window.print();
      }, 500);
    }
  };

  const readFile = (e) => {
    e.preventDefault();
    setShow(false);
    setToModify([]);
    if (e.target.files[0].name.split(".").pop().toLowerCase() === "psm") {
      const reader = new FileReader();
      reader.onload = function () {
        processText(reader.result);
      };
      reader.readAsText(e.target.files[0]);
    } else {
      alert("Please provide a valid PSM file");
    }
  };

  const processText = (txt) => {
    var eachLine = txt.split("\n");
    let linedelineas = [];
    let finTexto = [];
    for (var i = 0, l = eachLine.length; i < l; i++) {
      // Identificar en donde acaba el texto, en el archivo siempre hay un 1 en la fila en donde acaba el texto, entonces guardar la posición en un array finTexto
      if (eachLine[i].startsWith("1")) {
        finTexto.push(i);
      }
      // identificar el ------------------------------ y guardarlo en otro array para tener los renglones en donde cada una sección
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
    // Texto
    for (let i = 0; i < finTexto[0]; i++) {
      textoArr.push(eachLine[i]);
    }
    // los primeros 3 posiciones del array no nos importan porque son los unrounded
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

    totalQ0112cl = convertArray(totalQ0112, false, 0);
    totalQ1324cl = convertArray(totalQ1324, false, 12);
    totalQ2536cl = convertArray(totalQ2536, false, 24);
    increQ0112cl = convertArray(increQ0112, true, 0);
    increQ1324cl = convertArray(increQ1324, true, 12);
    increQ2536cl = convertArray(increQ2536, true, 24);

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

  const convertArray = (arr1, flag, cols) => {
    let tempArray = [];
    let result = [];
    // Quitar espacion en blanco
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
    // console.log(result);
    // analizar si esta vacio y guardar el index
    if (flag) {
      let arrTraysWithChange = [];
      for (let i = 0; i < result.length; i++) {
        for (let j = 1; j <= 12; j++) {
          if (result[i][j] !== "-") {
            arrTraysWithChange.push(j + cols);
          }
        }
      }
      let uniq = [...new Set(arrTraysWithChange)];
      let conCambios = uniq.sort(function (a, b) {
        return a - b;
      });
      // console.log(conCambios);
      setToModify((prevToModify) => [...prevToModify, ...conCambios]);
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
            onChange={async (e) => readFile(e)}
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
            <div className="info">
              <h3>Trays a modificar {toModify.length}</h3>
            </div>
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
                        }>
                        {line}
                      </pre>
                    );
                  })}
              </div>
            </div>
            <div className="s0112 section">
              <div className="barnumbers">
                <span></span>
                {header1 &&
                  header1.map((head, i) => (
                    <span
                      key={i}
                      className={
                        toModify.includes(Number(head))
                          ? "modificar"
                          : "noModificar"
                      }>
                      {head}
                    </span>
                  ))}
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
                          }>
                          <div
                            className={
                              j % 2
                                ? ""
                                : j === 0 || char === "-"
                                ? ""
                                : char < 0
                                ? "red"
                                : "green"
                            }>
                            {char}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ))}
              </div>
            </div>
            <div className="pagebreak"> </div>
            <div className="s1324 section">
              <div className="barnumbers">
                <span></span>
                {header2 &&
                  header2.map((head, i) => (
                    <span
                      key={i}
                      className={
                        toModify.includes(Number(head))
                          ? "modificar"
                          : "noModificar"
                      }>
                      {head}
                    </span>
                  ))}
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
                          }>
                          <div
                            className={
                              j % 2
                                ? ""
                                : j === 0 || char === "-"
                                ? ""
                                : char < 0
                                ? "red"
                                : "green"
                            }>
                            {char}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ))}
              </div>
            </div>
            <div className="pagebreak"> </div>
            <div className="s2536 section">
              <div className="barnumbers">
                <span></span>
                {header3 &&
                  header3.map((head, i) => (
                    <span
                      key={i}
                      className={
                        toModify.includes(Number(head))
                          ? "modificar"
                          : "noModificar"
                      }>
                      {head}
                    </span>
                  ))}
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
                          }>
                          <div
                            className={
                              j % 2
                                ? ""
                                : j === 0 || char === "-"
                                ? ""
                                : char < 0
                                ? "red"
                                : "green"
                            }>
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
      className="dialogOK">
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
