const Typer = {
  text: null,
  accessCountimer: null,
  index: 0,
  speed: 2,
  file: "",
  accessCount: 0,
  deniedCount: 0,
  init() {
    /*accessCountimer = setInterval(() => {
      Typer.updLstChr();
    }, 500);*/
    $.get(Typer.file, (data) => {
      Typer.text = data;
      Typer.text = Typer.text.slice(0, Typer.text.length - 1);
    });
  },

  content() {
    return $("#console").html();
  },

  write(str) {
    $("#console").append(str);
    return false;
  },

  addText(key) {
    if (key.keyCode == 18) {
      Typer.accessCount++;

      if (Typer.accessCount >= 3) {
        Typer.makeAccess();
      }
    } else if (key.keyCode == 20) {
      Typer.deniedCount++;

      if (Typer.deniedCount >= 3) {
        Typer.makeDenied();
      }
    } else if (key.keyCode == 27) {
      Typer.hidepop();
    } else if (Typer.text) {
      const cont = Typer.content();
      if (cont.substring(cont.length - 1, cont.length) == "|")
        $("#console").html(
          $("#console")
            .html()
            .substring(0, cont.length - 1)
        );
      if (key.keyCode != 8) {
        Typer.index += Typer.speed;
      } else {
        if (Typer.index > 0) Typer.index -= Typer.speed;
      }
      const text = Typer.text.substring(0, Typer.index);
      const rtn = new RegExp("\n", "g");

      $("#console").html(text.replace(rtn, "<br/>"));
      window.scrollBy(0, 50);
    }

    if (key.preventDefault && key.keyCode != 122) {
      key.preventDefault();
    }

    if (key.keyCode != 122) {
      // otherway prevent keys default behavior
      key.returnValue = false;
    }
  },

  updLstChr() {
    const cont = this.content();

    if (cont.substring(cont.length - 1, cont.length) == "|")
      $("#console").html(
        $("#console")
          .html()
          .substring(0, cont.length - 1)
      );
    else this.write("|"); // else write it
  }
};

function replaceUrls(text) {
  const http = text.indexOf("http://");
  const space = text.indexOf(".me ", http);

  if (space != -1) {
    const url = text.slice(http, space - 1);
    return text.replace(url, `<a href="${url}">${url}</a>`);
  } else {
    return text;
  }
}

Typer.speed = 3;
Typer.file = "./../data/Console.txt";
Typer.init();

const timer = setInterval("t();", 30);
function t() {
  Typer.addText({ keyCode: 123748 });

  if (Typer.index > Typer.text.length) {
    clearInterval(timer);
  }
}
