import Color from "./color"

export default class Col {
    static generate(r: number, g: number, b: number, a?: number): Color {
        return {
            r: Col.clamp(r, 0, 255),
            g: Col.clamp(g, 0, 255),
            b: Col.clamp(b, 0, 255),
            a: Col.clamp(a ?? 1, 0, 1.0),
        }
    }

    ///#FFFFFFなどの文字列からColorクラスへ変換
    static str2Color(str: string): Color {
        console.log(str)
        var r = str.slice(1, 3)
        var g = str.slice(3, 5)
        var b = str.slice(5)
        return { r: parseInt(r, 16), g: parseInt(g, 16), b: parseInt(b, 16), a: 1.0 }
    }
    ///0xFFFFFFなどの16進数字からColorクラスへ変換
    static int2Color(str: number): Color {
        var r = str >> 32// RRRR RRRR GGGG GGGG BBBB BBBB --> RRRR RRRR 
        var g = (str >> 16) & 0xFF // RRRR RRRR GGGG GGGG BBBB BBBB --> RRRR RRRR GGGG GGGG --> GGGG GGGG
        var b = str & 0xFF//RRRR RRRR GGGG GGGG BBBB BBBB --> BBBB BBBB
        return { r: r, g: g, b: b, a: 1.0 }
    }
    static obj2Color(str: any): Color {
        var r = str["r"]
        var g = str["g"]
        var b = str["b"]
        var a = str["a"]
        return { r: r, g: g, b: b, a: a }
    }

    static toString(color: Color): string {
        return "rgba(" + color.r + "," + color.g + "," + color.b + "," + color.a + ")"
    }
    ///色の明度を0.0~1.0までの間で返す
    static brightness(color: Color): number {
        return Math.max(color.r, color.g, color.b) / 255
    }

    static clamp(num: number, min: number, max: number): number {
        var res = Math.min(num, max)
        res = Math.max(num, min)
        return res
    }
}