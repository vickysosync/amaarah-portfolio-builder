import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { useSite, uid } from "@/store/site";
import { EmptyState, Modal, Toast } from "@/components/site/SiteLayout";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/banners", label: "Hero Banners" },
  { to: "/admin/about", label: "About" },
  { to: "/admin/services", label: "Services" },
  { to: "/admin/projects", label: "Projects" },
  { to: "/admin/portfolio", label: "Portfolio" },
  { to: "/admin/testimonials", label: "Testimonials" },
  { to: "/admin/faqs", label: "FAQs" },
  { to: "/admin/enquiries", label: "Enquiries" },
  { to: "/admin/contact", label: "Contact Information" },
  { to: "/admin/settings", label: "Settings" },
] as const;

export const adminInput =
  "w-full border border-input bg-card px-4 py-2.5 text-sm text-navy outline-none transition-colors focus:border-gold";

export function AdminShell({
  title,
  description,
  actions,
  children,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const { isAuthed, hydrated, logout, company } = useSite();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (hydrated && !isAuthed) navigate({ to: "/admin/login" });
  }, [hydrated, isAuthed, navigate]);

  if (!hydrated || !isAuthed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Loading admin…</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background lg:flex-row">
      <header className="flex items-center justify-between border-b border-border bg-navy px-5 py-4 lg:hidden">
        <span className="font-display tracking-[0.24em] text-primary-foreground">AMAARAH</span>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="border border-white/20 px-3 py-2 text-xs uppercase tracking-[0.16em] text-primary-foreground"
        >
          Menu
        </button>
      </header>

      <aside
        className={`bg-navy text-primary-foreground lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:shrink-0 ${
          open ? "block" : "hidden lg:block"
        }`}
      >
        <div className="hidden px-7 py-8 lg:block">
          <p className="font-display text-xl tracking-[0.24em]">AMAARAH</p>
          <p className="mt-1 text-[0.55rem] font-semibold tracking-[0.3em] text-gold">ADMIN PANEL</p>
        </div>
        <nav className="flex flex-col px-4 pb-6 lg:px-4">
          {navItems.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={`border-l-2 px-4 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.14em] transition-colors ${
                  active
                    ? "border-gold bg-white/5 text-gold"
                    : "border-transparent text-primary-foreground/65 hover:text-gold"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => {
              logout();
              navigate({ to: "/admin/login" });
            }}
            className="mt-4 border-l-2 border-transparent px-4 py-3 text-left text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-primary-foreground/65 transition-colors hover:text-gold"
          >
            Logout
          </button>
          <Link
            to="/"
            className="border-l-2 border-transparent px-4 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-primary-foreground/40 transition-colors hover:text-gold"
          >
            View Website
          </Link>
        </nav>
      </aside>

      <main className="flex-1 px-5 py-8 lg:px-10 lg:py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-gold">{company.shortName} Admin</p>
            <h1 className="mt-2 text-2xl text-navy lg:text-3xl">{title}</h1>
            {description ? <p className="mt-2 text-sm text-muted-foreground">{description}</p> : null}
          </div>
          {actions}
        </div>
        <div className="mt-8">{children}</div>
      </main>
    </div>
  );
}

export function ConfirmDialog({
  open,
  label,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  label: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal open={open} onClose={onCancel} title="Confirm delete">
      <p className="text-sm text-muted-foreground">
        Are you sure you want to delete <span className="font-semibold text-navy">{label}</span>? This cannot be
        undone.
      </p>
      <div className="mt-7 flex justify-end gap-3">
        <button type="button" onClick={onCancel} className="btn-base btn-outline-dark">
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="btn-base bg-destructive text-primary-foreground hover:opacity-90"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
}

export type FieldSpec<T> = {
  key: keyof T & string;
  label: string;
  type?: "text" | "textarea" | "select" | "checkbox" | "number" | "list";
  options?: readonly string[];
  required?: boolean;
};

export function AdminField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-[0.16em] text-navy">{label}</span>
      {children}
    </label>
  );
}

export function CrudManager<T extends { id: string }>({
  items,
  setItems,
  fields,
  blank,
  labelKey,
  emptyMessage,
  summary,
  activeKey = "active" as keyof T & string,
  reorder,
}: {
  items: T[];
  setItems: (v: T[]) => void;
  fields: FieldSpec<T>[];
  blank: Omit<T, "id">;
  labelKey: keyof T & string;
  emptyMessage: string;
  summary?: (item: T) => ReactNode;
  activeKey?: (keyof T & string) | null;
  reorder?: boolean;
}) {
  const [editing, setEditing] = useState<T | null>(null);
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState<Record<string, unknown>>({});
  const [toDelete, setToDelete] = useState<T | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const openCreate = () => {
    setDraft({ ...(blank as Record<string, unknown>) });
    setCreating(true);
    setEditing(null);
    setError(null);
  };

  const openEdit = (item: T) => {
    setDraft({ ...(item as unknown as Record<string, unknown>) });
    setEditing(item);
    setCreating(false);
    setError(null);
  };

  const close = () => {
    setEditing(null);
    setCreating(false);
    setError(null);
  };

  const save = () => {
    const missing = fields.filter((f) => f.required && !String(draft[f.key] ?? "").trim());
    if (missing.length > 0) {
      setError(`${missing[0]!.label} is required.`);
      return;
    }
    if (editing) {
      setItems(items.map((i) => (i.id === editing.id ? ({ ...draft, id: editing.id } as unknown as T) : i)));
      setToast("Changes saved.");
    } else {
      setItems([...items, { ...draft, id: uid("x") } as unknown as T]);
      setToast("Item added.");
    }
    close();
  };

  const move = (index: number, dir: -1 | 1) => {
    const next = [...items];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    const a = next[index]!;
    next[index] = next[target]!;
    next[target] = a;
    setItems(next);
  };

  return (
    <div>
      <div className="flex justify-end">
        <button type="button" onClick={openCreate} className="btn-base btn-gold">
          Add New
        </button>
      </div>

      {items.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            message={emptyMessage}
            action={
              <button type="button" onClick={openCreate} className="btn-base btn-navy">
                Add the first item
              </button>
            }
          />
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {items.map((item, index) => (
            <article
              key={item.id}
              className="flex flex-col gap-4 border border-border bg-card p-5 sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="min-w-0">
                <h2 className="text-base text-navy">{String(item[labelKey])}</h2>
                {summary ? <div className="mt-1 text-sm text-muted-foreground">{summary(item)}</div> : null}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {reorder ? (
                  <>
                    <button
                      type="button"
                      aria-label="Move up"
                      onClick={() => move(index, -1)}
                      className="btn-base btn-outline-dark h-9 w-9 p-0"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      aria-label="Move down"
                      onClick={() => move(index, 1)}
                      className="btn-base btn-outline-dark h-9 w-9 p-0"
                    >
                      ↓
                    </button>
                  </>
                ) : null}
                {activeKey ? (
                  <button
                    type="button"
                    onClick={() =>
                      setItems(
                        items.map((i) =>
                          i.id === item.id ? ({ ...i, [activeKey]: !i[activeKey] } as T) : i,
                        ),
                      )
                    }
                    className={`btn-base ${item[activeKey] ? "btn-navy" : "btn-outline-dark"}`}
                  >
                    {item[activeKey] ? "Active" : "Inactive"}
                  </button>
                ) : null}
                <button type="button" onClick={() => openEdit(item)} className="btn-base btn-outline-dark">
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => setToDelete(item)}
                  className="btn-base border border-destructive text-destructive hover:bg-destructive hover:text-primary-foreground"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      <Modal open={creating || editing !== null} onClose={close} title={editing ? "Edit item" : "Add new item"} wide>
        <div className="grid gap-5 sm:grid-cols-2">
          {fields.map((f) => {
            const value = draft[f.key];
            const wide = f.type === "textarea" || f.type === "list";
            return (
              <div key={f.key} className={wide ? "sm:col-span-2" : ""}>
                {f.type === "checkbox" ? (
                  <label className="flex items-center gap-3 text-sm text-navy">
                    <input
                      type="checkbox"
                      checked={Boolean(value)}
                      onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.checked }))}
                      className="h-4 w-4 accent-[var(--gold)]"
                    />
                    {f.label}
                  </label>
                ) : (
                  <AdminField label={f.label}>
                    {f.type === "textarea" ? (
                      <textarea
                        rows={4}
                        value={String(value ?? "")}
                        onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.value }))}
                        className={adminInput}
                      />
                    ) : f.type === "select" ? (
                      <select
                        value={String(value ?? "")}
                        onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.value }))}
                        className={adminInput}
                      >
                        {(f.options ?? []).map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    ) : f.type === "list" ? (
                      <textarea
                        rows={3}
                        value={Array.isArray(value) ? (value as string[]).join("\n") : ""}
                        onChange={(e) =>
                          setDraft((d) => ({
                            ...d,
                            [f.key]: e.target.value.split("\n").filter((v) => v.trim() !== ""),
                          }))
                        }
                        placeholder="One entry per line"
                        className={adminInput}
                      />
                    ) : f.type === "number" ? (
                      <input
                        type="number"
                        value={Number(value ?? 0)}
                        onChange={(e) => setDraft((d) => ({ ...d, [f.key]: Number(e.target.value) }))}
                        className={adminInput}
                      />
                    ) : (
                      <input
                        type="text"
                        value={String(value ?? "")}
                        onChange={(e) => setDraft((d) => ({ ...d, [f.key]: e.target.value }))}
                        className={adminInput}
                      />
                    )}
                  </AdminField>
                )}
              </div>
            );
          })}
        </div>
        {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}
        <div className="mt-7 flex justify-end gap-3">
          <button type="button" onClick={close} className="btn-base btn-outline-dark">
            Cancel
          </button>
          <button type="button" onClick={save} className="btn-base btn-gold">
            Save
          </button>
        </div>
      </Modal>

      <ConfirmDialog
        open={toDelete !== null}
        label={toDelete ? String(toDelete[labelKey]) : ""}
        onCancel={() => setToDelete(null)}
        onConfirm={() => {
          setItems(items.filter((i) => i.id !== toDelete?.id));
          setToDelete(null);
          setToast("Item deleted.");
        }}
      />

      <Toast message={toast} onDone={() => setToast(null)} />
    </div>
  );
}
