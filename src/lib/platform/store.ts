// Estado de la plataforma en el navegador (localStorage). Sin backend todavía: lo que se guarda
// aquí solo existe en este dispositivo. Cuando se conecte una base de datos, este módulo se reemplaza.
import { useSyncExternalStore } from "react";
import type { Diagnostic, SubjectKey } from "./diagnostic";
import type { PlanId } from "./plans";

export type Family = {
  guardian: string;
  email: string;
  phone: string;
  student: string;
  grade: string;
  subject: SubjectKey;
  plan: PlanId;
  consentAt: string;
};

export type PlatformState = {
  family?: Family | undefined;
  diagnostic?: Diagnostic | undefined;
  block?: string | undefined;
  trialBooked?: boolean | undefined;
  paid?: boolean | undefined;
  reportApproved?: boolean | undefined;
  reportAdjustment?: string | undefined;
};

const KEY = "cometa.platform.v1";
const EMPTY: PlatformState = {};

let state: PlatformState = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();

function load(): PlatformState {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as PlatformState) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function persist() {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // almacenamiento bloqueado: la sesión sigue en memoria
  }
}

function getSnapshot(): PlatformState {
  if (!hydrated && typeof window !== "undefined") {
    hydrated = true;
    state = load();
  }
  return state;
}

function getServerSnapshot(): PlatformState {
  return EMPTY;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function usePlatform(): PlatformState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function updatePlatform(patch: Partial<PlatformState>) {
  state = { ...getSnapshot(), ...patch };
  persist();
  listeners.forEach((l) => l());
}

export function resetPlatform() {
  state = EMPTY;
  persist();
  listeners.forEach((l) => l());
}

const noopSubscribe = () => () => {};

/** false en el servidor y durante la hidratación; true cuando ya se leyó el estado guardado del navegador. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
