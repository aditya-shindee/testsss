export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ssc_fullquestions_master: {
        Row: {
          correct_answer: string | null
          created_at: string | null
          exam_categories: string | null
          exam_subtype: string | null
          exam_tier: string | null
          exam_type: string | null
          explanation: string | null
          id: string
          option_a: string | null
          option_b: string | null
          option_c: string | null
          option_d: string | null
          question_level: string | null
          question_sequence: number | null
          question_text: string | null
          question_type: string | null
          quiz_format: string | null
          quiz_number: string | null
          quiz_sequence: number | null
          quiz_sub_type: string | null
          quiz_type: string | null
          serial_number: number
        }
        Insert: {
          correct_answer?: string | null
          created_at?: string | null
          exam_categories?: string | null
          exam_subtype?: string | null
          exam_tier?: string | null
          exam_type?: string | null
          explanation?: string | null
          id?: string
          option_a?: string | null
          option_b?: string | null
          option_c?: string | null
          option_d?: string | null
          question_level?: string | null
          question_sequence?: number | null
          question_text?: string | null
          question_type?: string | null
          quiz_format?: string | null
          quiz_number?: string | null
          quiz_sequence?: number | null
          quiz_sub_type?: string | null
          quiz_type?: string | null
          serial_number?: number
        }
        Update: {
          correct_answer?: string | null
          created_at?: string | null
          exam_categories?: string | null
          exam_subtype?: string | null
          exam_tier?: string | null
          exam_type?: string | null
          explanation?: string | null
          id?: string
          option_a?: string | null
          option_b?: string | null
          option_c?: string | null
          option_d?: string | null
          question_level?: string | null
          question_sequence?: number | null
          question_text?: string | null
          question_type?: string | null
          quiz_format?: string | null
          quiz_number?: string | null
          quiz_sequence?: number | null
          quiz_sub_type?: string | null
          quiz_type?: string | null
          serial_number?: number
        }
        Relationships: []
      }
      ssc_questions_master: {
        Row: {
          correct_answer: string | null
          created_at: string | null
          exam_categories: string | null
          exam_subtype: string | null
          exam_tier: string | null
          exam_type: string | null
          explanation: string | null
          id: string
          module_name: string | null
          option_a: string | null
          option_b: string | null
          option_c: string | null
          option_d: string | null
          question_level: string | null
          question_sequence: number | null
          question_text: string | null
          quiz_format: string | null
          quiz_number: string | null
          quiz_sequence: number | null
          serial_number: number
          unit_name: string | null
        }
        Insert: {
          correct_answer?: string | null
          created_at?: string | null
          exam_categories?: string | null
          exam_subtype?: string | null
          exam_tier?: string | null
          exam_type?: string | null
          explanation?: string | null
          id?: string
          module_name?: string | null
          option_a?: string | null
          option_b?: string | null
          option_c?: string | null
          option_d?: string | null
          question_level?: string | null
          question_sequence?: number | null
          question_text?: string | null
          quiz_format?: string | null
          quiz_number?: string | null
          quiz_sequence?: number | null
          serial_number?: number
          unit_name?: string | null
        }
        Update: {
          correct_answer?: string | null
          created_at?: string | null
          exam_categories?: string | null
          exam_subtype?: string | null
          exam_tier?: string | null
          exam_type?: string | null
          explanation?: string | null
          id?: string
          module_name?: string | null
          option_a?: string | null
          option_b?: string | null
          option_c?: string | null
          option_d?: string | null
          question_level?: string | null
          question_sequence?: number | null
          question_text?: string | null
          quiz_format?: string | null
          quiz_number?: string | null
          quiz_sequence?: number | null
          serial_number?: number
          unit_name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
