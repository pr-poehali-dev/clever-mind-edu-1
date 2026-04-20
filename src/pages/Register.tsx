import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";

type Role = "student" | "parent" | "teacher" | null;
type Step = 1 | 2 | 3;

const roles = [
  {
    id: "student" as Role,
    emoji: "🎒",
    title: "Ученик",
    desc: "1–8 класс, участвую в олимпиадах",
    color: "border-clover-300 bg-clover-50 hover:bg-clover-100",
    activeColor: "border-clover-600 bg-clover-50 ring-2 ring-clover-300",
    badge: "bg-clover-100 text-clover-700",
  },
  {
    id: "parent" as Role,
    emoji: "👨‍👩‍👧",
    title: "Родитель",
    desc: "Регистрирую и слежу за прогрессом ребёнка",
    color: "border-amber-300 bg-amber-50 hover:bg-amber-100",
    activeColor: "border-amber-500 bg-amber-50 ring-2 ring-amber-300",
    badge: "bg-amber-100 text-amber-700",
  },
  {
    id: "teacher" as Role,
    emoji: "📚",
    title: "Учитель / Школа",
    desc: "Массовая регистрация класса, отчёты",
    color: "border-blue-300 bg-blue-50 hover:bg-blue-100",
    activeColor: "border-blue-500 bg-blue-50 ring-2 ring-blue-300",
    badge: "bg-blue-100 text-blue-700",
  },
];

const gradeOptions = ["1", "2", "3", "4", "5", "6", "7", "8"];
const subjectOptions = ["Математика", "Русский язык", "Окружающий мир", "Информатика", "Английский язык", "Биология"];

export default function Register() {
  const [step, setStep] = useState<Step>(1);
  const [role, setRole] = useState<Role>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    grade: "",
    childName: "",
    school: "",
    subjects: [] as string[],
  });
  const [agreed, setAgreed] = useState(false);

  const selectedRole = roles.find((r) => r.id === role);

  const handleSubjectToggle = (subj: string) => {
    setForm((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(subj)
        ? prev.subjects.filter((s) => s !== subj)
        : [...prev.subjects, subj],
    }));
  };

  const canProceedStep1 = role !== null;
  const canProceedStep2 =
    form.name.trim() &&
    form.email.trim() &&
    form.password.length >= 6 &&
    (role !== "student" || form.grade) &&
    (role !== "parent" || form.childName.trim()) &&
    (role !== "teacher" || form.school.trim());

  return (
    <div className="min-h-screen font-golos hero-bg flex flex-col">
      {/* NAVBAR */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-clover-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">🍀</span>
            <div>
              <span className="font-bold text-clover-700 text-lg leading-none block">Клевер</span>
              <span className="text-clover-500 text-xs tracking-widest uppercase">Маинд</span>
            </div>
          </a>
          <div className="text-sm text-foreground/60">
            Уже есть аккаунт?{" "}
            <a href="#" className="text-clover-600 font-semibold hover:underline">
              Войти
            </a>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg">
          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {([1, 2, 3] as Step[]).map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    s < step
                      ? "bg-clover-600 text-white"
                      : s === step
                      ? "bg-clover-600 text-white shadow-md shadow-clover-200"
                      : "bg-clover-100 text-clover-400"
                  }`}
                >
                  {s < step ? <Icon name="Check" size={14} /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-12 h-0.5 rounded transition-all duration-300 ${
                      s < step ? "bg-clover-500" : "bg-clover-100"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-clover-100/50 border border-clover-100 overflow-hidden animate-fade-in">

            {/* STEP 1 — Role selection */}
            {step === 1 && (
              <div className="p-8">
                <div className="text-center mb-8">
                  <div className="text-4xl mb-3">🍀</div>
                  <h1 className="text-2xl font-bold text-foreground">Добро пожаловать!</h1>
                  <p className="text-foreground/60 mt-1">Выберите, кто вы, чтобы мы настроили аккаунт под вас</p>
                </div>

                <div className="space-y-3 mb-8">
                  {roles.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setRole(r.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
                        role === r.id ? r.activeColor : r.color
                      }`}
                    >
                      <div className="text-3xl">{r.emoji}</div>
                      <div className="flex-1">
                        <div className="font-bold text-foreground">{r.title}</div>
                        <div className="text-sm text-foreground/60">{r.desc}</div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          role === r.id ? "border-clover-600 bg-clover-600" : "border-gray-300"
                        }`}
                      >
                        {role === r.id && <Icon name="Check" size={11} className="text-white" />}
                      </div>
                    </button>
                  ))}
                </div>

                <Button
                  className="w-full bg-clover-600 hover:bg-clover-700 text-white h-12 text-base font-semibold"
                  disabled={!canProceedStep1}
                  onClick={() => setStep(2)}
                >
                  Продолжить
                  <Icon name="ArrowRight" size={18} className="ml-2" />
                </Button>
              </div>
            )}

            {/* STEP 2 — Personal info */}
            {step === 2 && (
              <div className="p-8">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1 text-sm text-foreground/50 hover:text-clover-600 mb-6 transition-colors"
                >
                  <Icon name="ArrowLeft" size={15} />
                  Назад
                </button>

                {selectedRole && (
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-2xl">{selectedRole.emoji}</span>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">Данные аккаунта</h2>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${selectedRole.badge}`}>
                        {selectedRole.title}
                      </span>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-foreground mb-1.5 block">
                      {role === "teacher" ? "Имя и должность" : "Ваше имя"}
                    </Label>
                    <Input
                      placeholder={role === "teacher" ? "Иванова Мария Петровна" : "Введите имя"}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="border-clover-200 focus:border-clover-500 rounded-xl h-11"
                    />
                  </div>

                  {role === "student" && (
                    <div>
                      <Label className="text-sm font-medium text-foreground mb-1.5 block">Класс</Label>
                      <div className="flex flex-wrap gap-2">
                        {gradeOptions.map((g) => (
                          <button
                            key={g}
                            onClick={() => setForm({ ...form, grade: g })}
                            className={`w-10 h-10 rounded-xl text-sm font-bold border-2 transition-all ${
                              form.grade === g
                                ? "bg-clover-600 text-white border-clover-600"
                                : "bg-white text-foreground/70 border-clover-200 hover:border-clover-400"
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {role === "parent" && (
                    <div>
                      <Label className="text-sm font-medium text-foreground mb-1.5 block">Имя ребёнка</Label>
                      <Input
                        placeholder="Введите имя ребёнка"
                        value={form.childName}
                        onChange={(e) => setForm({ ...form, childName: e.target.value })}
                        className="border-clover-200 focus:border-clover-500 rounded-xl h-11"
                      />
                    </div>
                  )}

                  {role === "teacher" && (
                    <div>
                      <Label className="text-sm font-medium text-foreground mb-1.5 block">Школа / Организация</Label>
                      <Input
                        placeholder="МБОУ СОШ №1, г. Москва"
                        value={form.school}
                        onChange={(e) => setForm({ ...form, school: e.target.value })}
                        className="border-clover-200 focus:border-clover-500 rounded-xl h-11"
                      />
                    </div>
                  )}

                  <div>
                    <Label className="text-sm font-medium text-foreground mb-1.5 block">Email</Label>
                    <Input
                      type="email"
                      placeholder="example@mail.ru"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="border-clover-200 focus:border-clover-500 rounded-xl h-11"
                    />
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-foreground mb-1.5 block">Пароль</Label>
                    <Input
                      type="password"
                      placeholder="Минимум 6 символов"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      className="border-clover-200 focus:border-clover-500 rounded-xl h-11"
                    />
                  </div>
                </div>

                <Button
                  className="w-full bg-clover-600 hover:bg-clover-700 text-white h-12 text-base font-semibold mt-6"
                  disabled={!canProceedStep2}
                  onClick={() => setStep(3)}
                >
                  Продолжить
                  <Icon name="ArrowRight" size={18} className="ml-2" />
                </Button>
              </div>
            )}

            {/* STEP 3 — Interests + confirm */}
            {step === 3 && (
              <div className="p-8">
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-1 text-sm text-foreground/50 hover:text-clover-600 mb-6 transition-colors"
                >
                  <Icon name="ArrowLeft" size={15} />
                  Назад
                </button>

                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-foreground">Почти готово!</h2>
                  <p className="text-foreground/60 text-sm mt-1">
                    {role === "teacher"
                      ? "Выберите предметы, по которым ведёте занятия"
                      : "Выберите интересные предметы (можно несколько)"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-6">
                  {subjectOptions.map((subj) => {
                    const active = form.subjects.includes(subj);
                    return (
                      <button
                        key={subj}
                        onClick={() => handleSubjectToggle(subj)}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 text-sm font-medium transition-all duration-200 text-left ${
                          active
                            ? "bg-clover-600 text-white border-clover-600"
                            : "bg-white text-foreground/70 border-clover-200 hover:border-clover-400"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ${
                            active ? "bg-white/20" : "bg-clover-100"
                          }`}
                        >
                          {active && <Icon name="Check" size={10} className="text-white" />}
                        </div>
                        {subj}
                      </button>
                    );
                  })}
                </div>

                {/* Summary */}
                <div className="bg-clover-50 rounded-2xl p-4 mb-6 border border-clover-100">
                  <div className="text-sm font-semibold text-foreground mb-2">Ваш аккаунт:</div>
                  <div className="space-y-1 text-sm text-foreground/70">
                    <div className="flex items-center gap-2">
                      <Icon name="User" size={14} className="text-clover-500" />
                      <span>{form.name || "—"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Mail" size={14} className="text-clover-500" />
                      <span>{form.email || "—"}</span>
                    </div>
                    {role === "student" && form.grade && (
                      <div className="flex items-center gap-2">
                        <Icon name="GraduationCap" size={14} className="text-clover-500" />
                        <span>{form.grade} класс</span>
                      </div>
                    )}
                    {role === "parent" && form.childName && (
                      <div className="flex items-center gap-2">
                        <Icon name="Heart" size={14} className="text-clover-500" />
                        <span>Ребёнок: {form.childName}</span>
                      </div>
                    )}
                    {role === "teacher" && form.school && (
                      <div className="flex items-center gap-2">
                        <Icon name="Building" size={14} className="text-clover-500" />
                        <span>{form.school}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <span>{selectedRole?.emoji}</span>
                      <span>{selectedRole?.title}</span>
                    </div>
                  </div>
                </div>

                <label className="flex items-start gap-3 mb-6 cursor-pointer group">
                  <button
                    onClick={() => setAgreed(!agreed)}
                    className={`mt-0.5 w-5 h-5 rounded flex-shrink-0 border-2 flex items-center justify-center transition-all ${
                      agreed ? "bg-clover-600 border-clover-600" : "border-clover-300 group-hover:border-clover-500"
                    }`}
                  >
                    {agreed && <Icon name="Check" size={11} className="text-white" />}
                  </button>
                  <span className="text-sm text-foreground/65 leading-tight">
                    Я согласен(а) с{" "}
                    <a href="#" className="text-clover-600 hover:underline">условиями использования</a>{" "}
                    и{" "}
                    <a href="#" className="text-clover-600 hover:underline">политикой конфиденциальности</a>
                  </span>
                </label>

                <Button
                  className="w-full bg-clover-600 hover:bg-clover-700 text-white h-12 text-base font-semibold"
                  disabled={!agreed}
                >
                  <Icon name="Sparkles" size={18} className="mr-2" />
                  Создать аккаунт
                </Button>
              </div>
            )}
          </div>

          <p className="text-center text-sm text-foreground/50 mt-6">
            Регистрация бесплатна. Никакой рекламы.
          </p>
        </div>
      </div>
    </div>
  );
}
