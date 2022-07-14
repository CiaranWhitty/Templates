// How to Run Function: firebase deploy --only functions
// To Add A New Firebase Project to This Functions: firebase use --add
// To Change Projects: firebase use {NameOfProject} (from .firebaserc file)

import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";
import * as admin from "firebase-admin";

const allowedOrigins = ["http://localhost:3000"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();
app.use(express.json());
app.use(cors(options));
admin.initializeApp();

const appCheckVerification = async (req:any, res:any, next:any) => {
  const appCheckToken = req.header("X-Firebase-AppCheck");
  if (!appCheckToken) {
    res.status(401);
    return next("Unauthorized");
  }
  try {
    const appCheckClaims = await admin.appCheck().verifyToken(appCheckToken);
    if (!appCheckClaims) {
      console.log("appCheckClaims Not Here");
    }
    return next();
  } catch (err) {
    res.status(401);
    return next("Unauthorized");
  }
};

/* Main */

// --get /things
app.get("/things", (req:any, res:any) => {
  const authEmail = req.header("X-Auth-Email");
  let items: any[] = [];
  const Ref = admin.database().ref("Things");
  Ref.on(
      "value",
      (snapshot) => {
        const data = snapshot.val();
        for (const id in data) {
          if (data != null) {
            items.push({id, ...data[id]});
          }
        }
        items = items.filter((i) => i.email === authEmail);
        res.status(200).json(items);
      },
      (errorObject) => {
        res.status(404).send("The read failed: " + errorObject.name);
      }
  );
});

// --get /things/{urlName}
app.get("/things/:urlName", (req, res) => {
  const productUrlName = req.params.urlName;
  let items: any[] = [];
  const Ref = admin.database().ref("Things");
  Ref.on(
      "value",
      (snapshot) => {
        const data = snapshot.val();
        const keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
          const k = keys[i];
          items.push(data[k]);
        }
        items = items.filter((item) => item.urlName === productUrlName);
        res.status(200).json(items);
      },
      (errorObject) => {
        res.status(404).send("The read failed: " + errorObject.name);
      }
  );
});

// --get /things/i/:uId
app.get("/things/i/:uId", [appCheckVerification], (req: any, res: any) => {
  const uId = req.params.uId;
  let items: any[] = [];
  const Ref = admin.database().ref("Things");
  Ref.on(
      "value",
      (snapshot) => {
        const data = snapshot.val();
        for (const id in data) {
          if (data != null) {
            items.push({id, ...data[id]});
          }
        }
        items = items.filter((item) => item.uId === uId);
        res.status(200).json(items);
      },
      (errorObject) => {
        res.status(404).send("The read failed: " + errorObject.name);
      }
  );
});

// --post /thing (Adding a thing)
app.post("/thing", [appCheckVerification], (req:any, res:any) => {
  const event = req.body;

  const date = new Date();
  const dateMillis = date.getTime();

  const uId = event.uId;
  const name = event.name;
  const urlName = event.name;

  admin.database().ref("Things").push(
      {
        uId: uId,
        name: name,
        urlName: urlName,
        dateMillis: dateMillis,
      }
  )
      .then((snapshot) => {
        return res.json({received: true,
          ref: snapshot.ref.toString()});
      })
      .catch((err) => {
        console.log("/thing (post) Error:", err);
        return res.status(500).end();
      });
  res.json({received: true});
});

// --put /thing/:id (Editing a thing)
app.put("/thing/:id", [appCheckVerification], (req:any, res:any) => {
  const event = req.body;
  const id = req.params.id;

  const name = event.name;
  const urlName = event.urlName;

  admin.database().ref("Things").child(id).update(
      {
        name: name,
        urlName: urlName,
      }
  )
      .then((snapshot) => {
        return res.json({received: true,
          ref: snapshot.ref.toString()});
      })
      .catch((err) => {
        console.log("/thing/:id (put) Error:", err);
        return res.status(500).end();
      });
  res.json({received: true});
});

// --delete /thing/:id
app.delete("/thing/:id", [appCheckVerification], (req:any, res:any) => {
  const id = req.params.id;
  admin.database()
      .ref("Things")
      .child(id)
      .remove()
      .then((snapshot) => {
        return res.json({received: true,
          ref: snapshot.ref.toString()});
      })
      .catch((err) => {
        console.log("/thing/:id (delete) Error:", err);
        return res.status(500).end();
      });
  res.json({received: true});
});

// --post /User (Adding a User) - SignUp
app.post("/user", [appCheckVerification], (req:any, res:any) => {
  const event = req.body;

  const date = new Date();
  const dateMillis = date.getTime();

  const uId = event.uId;
  const email = event.email;
  const firstname = event.fName;
  const lastname = event.lName;
  const fullName = firstname + " " + lastname;

  admin.database().ref("Users").push(
      {
        uId: uId,
        dateMillis: dateMillis,
        userEmail: email,
        name: fullName,
        fName: firstname,
        lName: lastname,
      }
  )
      .then((snapshot) => {
        return res.json({received: true,
          ref: snapshot.ref.toString()});
      })
      .catch((err) => {
        console.log("/Users (post) Error:", err);
        return res.status(500).end();
      });
  res.json({received: true});
});

// --get /users
app.get("/users", [appCheckVerification], (req:any, res:any) => {
  const authEmail = req.header("X-Auth-Email");
  let items: any[] = [];
  const Ref = admin.database().ref("Users");
  Ref.on(
      "value",
      (snapshot) => {
        const data = snapshot.val();
        for (const id in data) {
          if (data != null) {
            items.push({id, ...data[id]});
          }
        }
        items = items.filter((i) => i.userEmail === authEmail);
        res.status(200).json(items);
      },
      (errorObject) => {
        res.status(404).send("The read failed: " + errorObject.name);
      }
  );
});

/* Main */

export const api = functions.region("europe-west1").https.onRequest(app);
