import fs from "node:fs";
import path from "node:path";

const uniq = <T>(arr: T[]) => [...new Set(arr)];

function mergeArrays(a?: string[], b?: string[]) {
    return uniq([...(a ?? []), ...(b ?? [])]);
}

function mergeKeep(a: any = {}, b: any = {}) {
    return {
        classes: mergeArrays(a.classes, b.classes),
        prefixes: mergeArrays(a.prefixes, b.prefixes),
        regex: mergeArrays(a.regex, b.regex),
    };
}

function mergeJsonFile(filePath: string, incoming: any) {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify(incoming, null, 2));
        return;
    }
    const current = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const merged = {
        ...current,
        ...incoming,
        keep: mergeKeep(current.keep, incoming.keep),
        include: mergeArrays(current.include, incoming.include),
        exclude: mergeArrays(current.exclude, incoming.exclude),
    };
    fs.writeFileSync(filePath, JSON.stringify(merged, null, 2));
}

function loadKeepList(projectRoot: string) {
    try {
        const p = path.join(projectRoot, "keep-list.cjs");
        if (!fs.existsSync(p)) return { classes: [], prefixes: [], regex: [] };
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const mod = require(p);
        return mergeKeep(mod, {});
    } catch {
        return { classes: [], prefixes: [], regex: [] };
    }
}

async function loadKeepFunctions(projectRoot: string) {
    try {
        const p = path.join(projectRoot, "keep-functions.cjs");
        if (!fs.existsSync(p)) return { classes: [], prefixes: [], regex: [] };
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const mod = require(p);
        const out =
            typeof mod === "function" ? await mod({ projectRoot }) : mod;
        return mergeKeep(out, {});
    } catch {
        return { classes: [], prefixes: [], regex: [] };
    }
}

/** Écrire/mettre à jour un fichier SANS l’écraser si déjà présent (region replace optionnelle). */
function writeFileIdempotent(filePath: string, content: string) {
    const START = "/* CSS-PRUNE AUTOGEN START */";
    const END = "/* CSS-PRUNE AUTOGEN END */";
    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
        fs.writeFileSync(filePath, content);
        return;
    }
    const prev = fs.readFileSync(filePath, "utf8");
    if (prev.includes(START) && prev.includes(END)) {
        const next = prev.replace(
            new RegExp(`${START}[\\s\\S]*?${END}`),
            `${START}\n${content}\n${END}`
        );
        fs.writeFileSync(filePath, next);
    } else {
        fs.writeFileSync(filePath, prev + `\n\n${START}\n${content}\n${END}\n`);
    }
}
