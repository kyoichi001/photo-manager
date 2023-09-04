import Color from "@/entity/color"

/**
 * Colorオブジェクトのラッパー関数的な
 */
export class Col {
    static generate(r: number, g: number, b: number, a?: number): Color {
        return {
            r: Col.clamp(r, 0, 255),
            g: Col.clamp(g, 0, 255),
            b: Col.clamp(b, 0, 255),
            a: Col.clamp(a ?? 1, 0, 1.0),
        }
    }

    /**
     * #FFFFFFなどの文字列からColorクラスへ変換
     */
    static str2Color(str: string): Color {
        var r = str.slice(1, 3)
        var g = str.slice(3, 5)
        var b = str.slice(5)
        return { r: parseInt(r, 16), g: parseInt(g, 16), b: parseInt(b, 16), a: 1.0 }
    }

    /**
     * 0xFFFFFFなどの16進数字からColorクラスへ変換
     */
    static int2Color(str: number): Color {
        var r = str >> 32// RRRR RRRR GGGG GGGG BBBB BBBB --> RRRR RRRR 
        var g = (str >> 16) & 0xFF // RRRR RRRR GGGG GGGG BBBB BBBB --> RRRR RRRR GGGG GGGG --> GGGG GGGG
        var b = str & 0xFF//RRRR RRRR GGGG GGGG BBBB BBBB --> BBBB BBBB
        return { r: r, g: g, b: b, a: 1.0 }
    }

    static obj2Color(obj: any): Color {
        var r = obj["r"]
        var g = obj["g"]
        var b = obj["b"]
        var a = obj["a"]
        return { r: r, g: g, b: b, a: a }
    }

    /**
     * 
     * @param color 
     * @returns "rgba(XX, XX, XX, XX)" 
     */
    static toString(color: Color): string {
        return "rgba(" + color.r + "," + color.g + "," + color.b + "," + color.a + ")"
    }

    /**
     * 
     * @param color 
     * @returns "#XXXXXX"
     */
    static toHexString(color: Color): string {
        return "#" + ('0' + color.r.toString(16)).substr(-2) + ('0' + color.g.toString(16)).substr(-2) + ('0' + color.b.toString(16)).substr(-2)
    }
    /**
     * 
     * @param color 
     * @returns "#XXXXXX"
     */
    static numbertoHexString(color: number): string {
        return "#" + color.toString(16)
    }
    /**
         * 
         * @param color "#XXXXXX"
         * @returns "#XXXXXX"
         */
    static hexstringToColor(color: string): number {
        return parseInt(color.slice(1), 16)
    }

    /**
     * 色の明度を0.0~1.0までの間で返す
     * @param color 
     * @returns 0.0~1.0
     */
    static brightness(color: Color): number {
        return Math.max(color.r, color.g, color.b) / 255
    }

    static clamp(num: number, min: number, max: number): number {
        var res = Math.min(num, max)
        res = Math.max(num, min)
        return res
    }
}