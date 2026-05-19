"use client";

import { useState } from "react";

interface SettingsSection {
  title: string;
  fields: SettingsField[];
}

interface SettingsField {
  label: string;
  description?: string;
  type: "text" | "email" | "select" | "toggle";
  defaultValue: string | boolean;
  options?: string[];
}

const sections: SettingsSection[] = [
  {
    title: "Profil",
    fields: [
      { label: "Nom", type: "text", defaultValue: "Victor" },
      {
        label: "Email",
        type: "email",
        defaultValue: "deletrezvictor@gmail.com",
        description: "Utilisé pour les notifications et la facturation",
      },
      {
        label: "Entreprise",
        type: "text",
        defaultValue: "",
      },
    ],
  },
  {
    title: "Prospection",
    fields: [
      {
        label: "Secteur par défaut",
        type: "text",
        defaultValue: "Logistique",
        description: "Pré-rempli dans le Prospect Finder",
      },
      {
        label: "Pays par défaut",
        type: "text",
        defaultValue: "France",
      },
      {
        label: "Rayon de recherche par défaut",
        type: "select",
        defaultValue: "50 km",
        options: ["10 km", "20 km", "50 km", "100 km"],
      },
    ],
  },
  {
    title: "Notifications",
    fields: [
      {
        label: "Alertes crédits bas",
        type: "toggle",
        defaultValue: true,
        description: "Notification quand il reste moins de 20% de crédits",
      },
      {
        label: "Résumé hebdomadaire",
        type: "toggle",
        defaultValue: false,
        description: "Email avec tes stats de la semaine",
      },
    ],
  },
];

export function SettingsView() {
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <header className="mb-8">
        <p className="text-sm text-slate-400">Paramètres</p>
        <h1 className="mt-1 text-3xl font-semibold">Paramètres du compte</h1>
        <p className="mt-2 text-slate-400">
          Configure ton profil et tes préférences de prospection.
        </p>
      </header>

      <div className="space-y-8">
        {sections.map((section) => (
          <div
            key={section.title}
            className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6"
          >
            <h2 className="mb-6 text-lg font-semibold">{section.title}</h2>
            <div className="space-y-4">
              {section.fields.map((field) => (
                <SettingsFieldRow key={field.label} field={field} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <p className="text-xs text-slate-600">
          MVP : les paramètres ne sont pas encore persistés côté serveur.
        </p>
        <button
          type="button"
          onClick={handleSave}
          className={`rounded-2xl px-6 py-3 text-sm font-semibold transition-colors ${
            saved
              ? "bg-white/10 text-white"
              : "bg-white text-black hover:bg-gray-100"
          }`}
        >
          {saved ? "Enregistré ✓" : "Enregistrer"}
        </button>
      </div>
    </div>
  );
}

function SettingsFieldRow({ field }: { field: SettingsField }) {
  const [toggleValue, setToggleValue] = useState(
    field.type === "toggle" ? (field.defaultValue as boolean) : false,
  );

  if (field.type === "toggle") {
    return (
      <div className="flex items-center justify-between gap-4">
        <div>
          <label className="text-sm font-medium text-white">{field.label}</label>
          {field.description ? (
            <p className="mt-0.5 text-xs text-slate-500">{field.description}</p>
          ) : null}
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={toggleValue}
          onClick={() => setToggleValue(!toggleValue)}
          className={`relative h-6 w-11 rounded-full transition-colors ${
            toggleValue ? "bg-white/30" : "bg-slate-700"
          }`}
        >
          <span
            className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
              toggleValue ? "translate-x-5" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>
    );
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-300">
        {field.label}
      </label>
      {field.description ? (
        <p className="mb-2 text-xs text-slate-500">{field.description}</p>
      ) : null}
      {field.type === "select" ? (
        <select
          defaultValue={field.defaultValue as string}
          className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-white/20"
        >
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={field.type}
          defaultValue={field.defaultValue as string}
          className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-white/20"
        />
      )}
    </div>
  );
}
