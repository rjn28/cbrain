import { NextResponse } from "next/server"
import { exec } from "child_process"
import { promisify } from "util"
import path from "path"
import fs from "fs/promises"

const execAsync = promisify(exec)

/**
 * API pour exécuter la recherche YC Strategy
 */
export async function POST(request: Request) {
  try {
    const { idea } = await request.json()

    if (!idea) {
      return NextResponse.json(
        { error: "L'idée est requise" },
        { status: 400 }
      )
    }

    // Chemin vers le script Python
    const scriptPath = path.join(
      process.cwd(),
      "yc-strategy-agent",
      "scripts",
      "1_semantic_search.py"
    )

    // Exécuter le script Python
    const { stdout, stderr } = await execAsync(
      `python3 "${scriptPath}" "${idea.replace(/"/g, '\\"')}"`,
      {
        cwd: path.join(process.cwd(), "yc-strategy-agent"),
        env: { ...process.env },
        maxBuffer: 1024 * 1024 * 10, // 10MB buffer
      }
    )

    if (stderr && !stderr.includes("Warning")) {
      console.error("Python script error:", stderr)
    }

    // Parser la sortie JSON
    try {
      const results = JSON.parse(stdout)
      
      // Formater les résultats pour l'arbre
      const ycInsights = {
        similarCompanies: results.slice(0, 3).map((company: any) => ({
          name: company.company_name || "Unknown",
          description: company.one_liner || "",
          batch: company.batch || "",
          score: company.score || 0,
          url: company.website || "",
        })),
        insights: {
          marketValidation: `${results.length} entreprises YC similaires trouvées`,
          topCompany: results[0]?.company_name || "",
          averageScore: (results.reduce((acc: number, c: any) => acc + (c.score || 0), 0) / results.length).toFixed(2),
        }
      }

      return NextResponse.json(ycInsights)
    } catch (parseError) {
      console.error("Failed to parse Python output:", parseError)
      console.log("Raw stdout:", stdout)
      
      return NextResponse.json(
        { 
          error: "Erreur de parsing des résultats",
          details: stdout 
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("YC Strategy API error:", error)
    return NextResponse.json(
      { 
        error: "Erreur lors de l'exécution de la recherche YC",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}
