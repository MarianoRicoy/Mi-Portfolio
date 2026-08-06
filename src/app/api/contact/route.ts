import { NextResponse } from "next/server";

type ContactPayload = {
  nombre?: string;
  apellido?: string;
  email?: string;
  asunto?: string;
};

export async function POST(request: Request) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    return NextResponse.json(
      { error: "El formulario todavía no está configurado." },
      { status: 503 },
    );
  }

  let body: ContactPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }

  const nombre = body.nombre?.trim() ?? "";
  const apellido = body.apellido?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const asunto = body.asunto?.trim() ?? "";

  if (!nombre || !apellido || !email || !asunto) {
    return NextResponse.json(
      { error: "Completá todos los campos." },
      { status: 400 },
    );
  }

  const nombreCompleto = `${nombre} ${apellido}`;
  const subject = asunto || `Consulta desde portfolio - ${nombreCompleto}`;

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject,
      name: nombreCompleto,
      email,
      replyto: email,
      message: `Nombre: ${nombreCompleto}\nEmail: ${email}\nAsunto: ${subject}`,
      from_name: "Portfolio Mariano Ricoy",
    }),
  });

  const data = (await response.json()) as { success?: boolean; message?: string };

  if (!response.ok || !data.success) {
    return NextResponse.json(
      { error: data.message ?? "No se pudo enviar el mensaje." },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}
