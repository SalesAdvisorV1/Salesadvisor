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
      { label: "Entreprise", type: "text", defaultValue: "" },
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
      { label: "Pays par défaut", type: "text", defaultValue: "France" },
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

const inputClass =
  "w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 text-sm focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 focus:outline-none transition-all placeholder:text-gray-400";

export function SettingsView() {
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <header className="mb-6 pt-4">
        <h1 className="text-2xl font-bold text-gray-900">Paramètres du compte</h1>
        <p className="mt-1 text-sm text-gray-500">
          Configure ton profil et tes préférences de prospection.
        </p>
      </header>

      <div className="space-y-5">
        {sections.map((section) => (
          <div key={section.title} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="mb-5 text-base font-semibold text-gray-900">{section.title}</h2>
            <div className="space-y-4">
              {section.fields.map((field) => (
                <SettingsFieldRow key={field.label} field={field} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-xs text-gray-400">
          MVP : les paramètres ne sont pas encore persistés côté serveur.
        </p>
        <button
          type="button"
          onClick={handleSave}
          className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors ${
            saved
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-gray-900 text-white hover:bg-gray-800"
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
          <label className="text-sm font-medium text-gray-900">{field.label}</label>
          {field.description ? (
            <p className="mt-0.5 text-xs text-gray-500">{field.description}</p>
          ) : null}
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={toggleValue}
          onClick={() => setToggleValue(!toggleValue)}
          className={`relative h-6 w-11 rounded-full transition-colors ${
            toggleValue ? "bg-gray-900" : "bg-gray-200"
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
      <label className="mb-1.5 block text-xs font-medium text-gray-700 uppercase tracking-wider">
        {field.label}
      </label>
      {field.description ? (
        <p className="mb-2 text-xs text-gray-400">{field.description}</p>
      ) : null}
      {field.type === "select" ? (
        <select defaultValue={field.defaultValue as string} className={inputClass}>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <input
          type={field.type}
          defaultValue={field.defaultValue as string}
          className={inputClass}
        />
      )}
    </div>
  );
}
