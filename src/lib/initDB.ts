import admin from "firebase-admin";

import type { ServiceAccount } from "firebase-admin/lib/credential/index";

admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_CERT,
    client_x509_cert_url: process.env.CLIENT_CERT,
  } as ServiceAccount),
  databaseURL: process.env.DATABASE_URL,
});

export const db = admin.database();
export const scheduledJobs = db.ref("scheduledJobs");
