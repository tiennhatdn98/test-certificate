import { ChangeEvent } from "react";
import https from "https";
import axios from "axios";

export default function Home() {
  // const reader = (file: any) =>
  //   new Promise((resolve, reject) => {
  //     const fr = new FileReader();
  //     fr.onload = () => resolve(fr);
  //     fr.onerror = (err) => reject(err);
  //     fr.readAsArrayBuffer(file);
  //   });

  // async function getFilesData(fileList: any) {
  //   let fileResults = [];
  //   const frPromises = fileList.map(reader);

  //   try {
  //     fileResults = await Promise.all(frPromises);
  //     return fileResults;
  //   } catch (err) {
  //     console.error(err);
  //     return;
  //   }
  // }

  const handleChanger = async (event: any) => {
    event.preventDefault();
    const files = event.target.files;
    if (!files) {
      return;
    }

    let cert: any;
    let key: any;
    let ca: any;

    for (let i = 0; i < files.length; i++) {
      console.log("File: ", files[i].name);
      const content = await files[i].text();
      console.log(content);

      if (files[i].name === "ann.crt") {
        cert = content;
      }
      if (files[i].name === "ann.key") {
        key = content;
      }
      if (files[i].name === "ca.crt") {
        ca = content;
      }
    }

    // console.log("Agent Data: ", {
    //   cert: normalizedCert.cert,
    //   key: normalizedKey.key,
    //   ca: normalizedCa.cert,
    // });
    const httpsAgent = new https.Agent({
      cert,
      key,
      ca,
    });
    console.log("Http Agent: ", httpsAgent);

    try {
      const { data } = await axios.get(
        "https://localhost:3001/helloworld/greetings?name=john",
        {
          httpsAgent,
        }
      );
      console.log("Data: ", data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <>
      <input
        type={"file"}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChanger(e)}
        multiple
      />
    </>
  );
}
