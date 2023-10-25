import { CompletionItemLabel } from "vscode";

export module StringFunctions {
    export function removeDoubleQuotesFromString(text: string): string {
        return text.replace(/"/g, "");
    }

    export function getNoOfLeftSpaces(text: string): number {
        return text.search(/\S|$/);
    }

    export function removeSpecialChars(text: string): string {
        return (text.replace(/[^a-zA-Z]/g, ""));
    }

    export function containsSpecialChars(text: string): boolean {
        return (text.includes(" ") || text.includes("+") || text.includes("/") || text.includes("-"));
    }

    function isCompletionItemLabel(obj: any): obj is CompletionItemLabel {
        return typeof obj === 'object' && 'label' in obj && typeof obj.label === 'string';
    }

    export function fromNameText(name: string | CompletionItemLabel): string {
        if (isCompletionItemLabel(name)) {
            name = name.label;
        }

        name = name.trim();
        if ((name.length > 1) && (name.substr(0, 1) === "\"") && (name.substr(name.length - 1, 1) === "\"")) {
            name = name.substr(1, name.length - 2).replace(new RegExp("\"\"", "g"), "\"");
        }
        return name;
    }

    // Levenshtein Distance
    export function LevenshteinDistance(s: string, t: string): number {
        let n = s.length;
        let m = t.length;

        let d: number[][] = [[n + 1], [m + 1]];

        // Step 1
        if (n === 0) {
            return m;
        }

        if (m === 0) {
            return n;
        }

        // Step 2
        // for (let i = 0; i <= n; d[i][0] = i++)
        // {
        // }

        // for (let j = 0; j <= m; d[0][j] = j++)
        // {
        // }

        // Step 3
        for (let i = 1; i <= n; i++) {
            //Step 4
            for (let j = 1; j <= m; j++) {
                // Step 5
                let cost = (t[j - 1] === s[i - 1]) ? 0 : 1;

                // Step 6
                d[i][j] = Math.min(
                    Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1),
                    d[i - 1][j - 1] + cost);
            }
        }
        // Step 7
        return d[n][m];
    }

    export function titleCaseWord(word: string) {
        if (!word) {
            return word;
        }
        return word[0].toUpperCase() + word.substr(1).toLowerCase();
    }

    export function removePrefixAndSuffixFromVariableName(varname: string, ignorePrefix: string, ignoreSuffix: string): string {
        // Remove Prefix if necessary
        if (ignorePrefix !== '') {
            if (varname.toUpperCase().startsWith(ignorePrefix)) {
                return varname.substring(ignorePrefix.length);
            }
        }
        // Remove Suffix if necessary
        if (ignoreSuffix !== '') {
            if (varname.toUpperCase().endsWith(ignoreSuffix)) {
                return varname.substring(0, varname.length - ignoreSuffix.length);
            }
        }
        return varname;
    }

    export function replaceAll(str: string, find: string, replace: string) {
        return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
    }

    export function escapeRegExp(str: string) {
        return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    }

    export function removeSpecialCharsAndSpaces(input: string): string {
        return (input.replace(/[^\w]/g, ''));
    }

}