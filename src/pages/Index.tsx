import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const MASCOT_URL =
  "https://cdn.poehali.dev/projects/2351edb0-e624-4ac5-a8b6-193286dcab08/files/95faa31d-76f6-4bf3-a1da-8a5f2d7e49ee.jpg";

const subjects = ["Все", "Математика", "Русский язык", "Окружающий мир", "Информатика", "Английский", "Биология"];

const olympiads = [
  {
    id: 1,
    subject: "Математика",
    emoji: "🔢",
    title: "Весенняя математика",
    classes: "1–4 кл.",
    date: "15 мая 2026",
    status: "open",
    participants: 1240,
    color: "bg-blue-50 border-blue-200",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    id: 2,
    subject: "Русский язык",
    emoji: "📝",
    title: "Слово и буква",
    classes: "2–5 кл.",
    date: "20 мая 2026",
    status: "open",
    participants: 890,
    color: "bg-purple-50 border-purple-200",
    badgeColor: "bg-purple-100 text-purple-700",
  },
  {
    id: 3,
    subject: "Окружающий мир",
    emoji: "🌍",
    title: "Юный исследователь",
    classes: "1–3 кл.",
    date: "25 мая 2026",
    status: "soon",
    participants: 560,
    color: "bg-green-50 border-green-200",
    badgeColor: "bg-green-100 text-green-700",
  },
  {
    id: 4,
    subject: "Информатика",
    emoji: "💻",
    title: "Цифровой мир",
    classes: "4–8 кл.",
    date: "1 июня 2026",
    status: "soon",
    participants: 320,
    color: "bg-orange-50 border-orange-200",
    badgeColor: "bg-orange-100 text-orange-700",
  },
  {
    id: 5,
    subject: "Английский",
    emoji: "🌐",
    title: "English Stars",
    classes: "3–6 кл.",
    date: "10 апреля 2026",
    status: "closed",
    participants: 1450,
    color: "bg-red-50 border-red-200",
    badgeColor: "bg-red-100 text-red-700",
  },
  {
    id: 6,
    subject: "Биология",
    emoji: "🌱",
    title: "Живой мир",
    classes: "5–8 кл.",
    date: "5 июня 2026",
    status: "soon",
    participants: 210,
    color: "bg-emerald-50 border-emerald-200",
    badgeColor: "bg-emerald-100 text-emerald-700",
  },
];

const students = [
  { name: "Алиса М.", grade: "4 класс", points: 2450, progress: 92, badge: "🥇" },
  { name: "Иван С.", grade: "6 класс", points: 2210, progress: 85, badge: "🥇" },
  { name: "Маша К.", grade: "3 класс", points: 1980, progress: 74, badge: "🥈" },
  { name: "Дима П.", grade: "5 класс", points: 1740, progress: 62, badge: "🥈" },
  { name: "Соня В.", grade: "2 класс", points: 1520, progress: 48, badge: "🥉" },
];

const achievements = [
  { icon: "Star", label: "Отличник", desc: "10 олимпиад на отлично", color: "text-yellow-500", bg: "bg-yellow-50" },
  { icon: "Zap", label: "Молниеносный", desc: "Самый быстрый результат", color: "text-blue-500", bg: "bg-blue-50" },
  { icon: "Trophy", label: "Чемпион", desc: "1 место в олимпиаде", color: "text-amber-500", bg: "bg-amber-50" },
  { icon: "Heart", label: "Постоянный", desc: "5 олимпиад подряд", color: "text-rose-500", bg: "bg-rose-50" },
  { icon: "BookOpen", label: "Эрудит", desc: "3 разных предмета", color: "text-indigo-500", bg: "bg-indigo-50" },
  { icon: "Award", label: "Призёр", desc: "Топ-3 в рейтинге", color: "text-green-600", bg: "bg-green-50" },
];

const steps = [
  { num: "1", icon: "Search", title: "Выберите олимпиаду", desc: "Найдите по предмету и классу из нашего каталога" },
  { num: "2", icon: "UserPlus", title: "Зарегистрируйтесь", desc: "Быстрая регистрация — займёт меньше минуты" },
  { num: "3", icon: "PenLine", title: "Пройдите задания", desc: "Выполняйте задания в удобное время онлайн" },
  { num: "4", icon: "Award", title: "Получите диплом", desc: "Именной диплом с QR-кодом для проверки подлинности" },
];

export default function Index() {
  const [activeSubject, setActiveSubject] = useState("Все");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const filtered =
    activeSubject === "Все"
      ? olympiads
      : olympiads.filter((o) => o.subject === activeSubject);

  const statusLabel: Record<string, { label: string; color: string }> = {
    open: { label: "Открыта", color: "bg-clover-100 text-clover-700" },
    soon: { label: "Скоро", color: "bg-amber-100 text-amber-700" },
    closed: { label: "Завершена", color: "bg-gray-100 text-gray-500" },
  };

  return (
    <div className="min-h-screen font-golos">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-clover-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🍀</span>
              <div>
                <span className="font-bold text-clover-700 text-lg leading-none block">Клевер</span>
                <span className="text-clover-500 text-xs tracking-widest uppercase">Маинд</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6">
              {["Олимпиады", "Курсы", "Результаты", "О проекте"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm text-foreground/70 hover:text-clover-600 transition-colors font-medium"
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="hidden md:flex text-clover-700">
                Войти
              </Button>
              <Button size="sm" className="bg-clover-600 hover:bg-clover-700 text-white" onClick={() => navigate("/register")}>
                Участвовать
              </Button>
              <button
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Icon name="Menu" size={20} className="text-foreground/70" />
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-clover-100 py-3 px-4 flex flex-col gap-2">
            {["Олимпиады", "Курсы", "Результаты", "О проекте"].map((item) => (
              <a key={item} href="#" className="text-sm text-foreground/70 py-1 font-medium">
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="hero-bg pt-16 pb-20 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-clover-100 text-clover-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                <span>🌟</span>
                <span>Более 5 000 участников в этом году</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-foreground">
                Расти, учись,{" "}
                <span className="text-gradient">побеждай</span>
                <br />
                <span className="font-caveat text-clover-500 text-5xl sm:text-6xl">с умом!</span>
              </h1>

              <p className="text-lg text-foreground/65 mb-8 max-w-lg mx-auto lg:mx-0">
                Образовательные олимпиады, курсы и репетиторство для учеников 1–8 классов.
                Участвуй, получай дипломы и отслеживай свой прогресс.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Button size="lg" className="bg-clover-600 hover:bg-clover-700 text-white px-8 h-12 text-base font-semibold" onClick={() => navigate("/register")}>
                  <Icon name="Play" size={18} className="mr-2" />
                  Принять участие
                </Button>
                <Button size="lg" variant="outline" className="border-clover-300 text-clover-700 hover:bg-clover-50 h-12 text-base">
                  <Icon name="Search" size={18} className="mr-2" />
                  Найти олимпиаду
                </Button>
              </div>

              <div className="flex items-center gap-8 mt-10 justify-center lg:justify-start">
                {[
                  { val: "50+", label: "Олимпиад" },
                  { val: "12", label: "Предметов" },
                  { val: "98%", label: "Довольных участников" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl font-bold text-clover-700">{stat.val}</div>
                    <div className="text-xs text-foreground/55 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 flex justify-center lg:justify-end relative">
              <div className="relative animate-float">
                <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-gradient-to-br from-clover-100 to-clover-200 flex items-center justify-center shadow-2xl shadow-clover-200">
                  <img
                    src={MASCOT_URL}
                    alt="Клевер — маскот"
                    className="w-64 h-64 sm:w-72 sm:h-72 object-contain rounded-full"
                  />
                </div>
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg px-3 py-2 flex items-center gap-2 animate-scale-in">
                  <span className="text-xl">🏆</span>
                  <div>
                    <div className="text-xs font-bold text-foreground">Диплом готов!</div>
                    <div className="text-xs text-foreground/50">Алиса, 4 класс</div>
                  </div>
                </div>
                <div className="absolute -bottom-2 -left-6 bg-white rounded-2xl shadow-lg px-3 py-2 flex items-center gap-2">
                  <span className="text-xl">⭐</span>
                  <div>
                    <div className="text-xs font-bold text-foreground">+120 очков</div>
                    <div className="text-xs text-foreground/50">Новое достижение</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-clover-200/30 blur-2xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full bg-amber-200/30 blur-xl pointer-events-none" />
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Как это работает?
            </h2>
            <p className="text-foreground/60 text-lg">Четыре простых шага до вашего диплома</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="relative p-6 rounded-3xl bg-clover-50 border border-clover-100 card-hover text-center"
              >
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 -right-3 z-10">
                    <Icon name="ChevronRight" size={20} className="text-clover-300" />
                  </div>
                )}
                <div className="w-12 h-12 rounded-2xl bg-clover-600 text-white flex items-center justify-center mx-auto mb-4 shadow-md shadow-clover-200">
                  <Icon name={step.icon} size={22} fallback="Star" />
                </div>
                <div className="font-caveat text-3xl text-clover-400 font-bold mb-1">{step.num}</div>
                <h3 className="font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-foreground/60">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OLYMPIADS CATALOG */}
      <section className="py-20 bg-clover-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-1">Ближайшие олимпиады</h2>
              <p className="text-foreground/60">Выберите предмет и класс</p>
            </div>
            <Button variant="outline" className="border-clover-300 text-clover-700 self-start sm:self-auto">
              Все олимпиады
              <Icon name="ArrowRight" size={16} className="ml-2" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {subjects.map((subj) => (
              <button
                key={subj}
                onClick={() => setActiveSubject(subj)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeSubject === subj
                    ? "bg-clover-600 text-white shadow-md"
                    : "bg-white text-foreground/70 border border-clover-200 hover:border-clover-400 hover:text-clover-700"
                }`}
              >
                {subj}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((olympiad) => (
              <div
                key={olympiad.id}
                className={`rounded-3xl border-2 p-6 bg-white card-hover cursor-pointer ${olympiad.color}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">{olympiad.emoji}</div>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${statusLabel[olympiad.status].color}`}
                  >
                    {statusLabel[olympiad.status].label}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-foreground mb-1">{olympiad.title}</h3>
                <div className="flex items-center gap-3 text-sm text-foreground/60 mb-4">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${olympiad.badgeColor}`}>
                    {olympiad.subject}
                  </span>
                  <span>{olympiad.classes}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-sm text-foreground/60">
                      <Icon name="Calendar" size={14} />
                      <span>{olympiad.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-foreground/60 mt-1">
                      <Icon name="Users" size={14} />
                      <span>{olympiad.participants.toLocaleString()} участников</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className={
                      olympiad.status === "closed"
                        ? "bg-gray-200 text-gray-500 hover:bg-gray-200 cursor-default"
                        : "bg-clover-600 hover:bg-clover-700 text-white"
                    }
                    disabled={olympiad.status === "closed"}
                  >
                    {olympiad.status === "closed" ? "Завершена" : "Участвовать"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RATINGS & ACHIEVEMENTS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Рейтинг и достижения
            </h2>
            <p className="text-foreground/60 text-lg">Следи за своим прогрессом и соревнуйся с лучшими</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Leaderboard */}
            <div className="bg-clover-50 rounded-3xl p-6 border border-clover-100">
              <div className="flex items-center gap-2 mb-6">
                <Icon name="Trophy" size={22} className="text-clover-600" />
                <h3 className="font-bold text-lg text-foreground">Топ учеников</h3>
              </div>
              <div className="space-y-4">
                {students.map((student, i) => (
                  <div
                    key={student.name}
                    className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 hover:shadow-sm ${
                      i === 0 ? "bg-amber-50 border border-amber-200" : "bg-white border border-clover-100"
                    }`}
                  >
                    <div className="text-2xl w-8 text-center">
                      {i < 3 ? (
                        student.badge
                      ) : (
                        <span className="text-sm font-bold text-foreground/50">#{i + 1}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm text-foreground truncate">{student.name}</span>
                        <span className="text-sm font-bold text-clover-700 ml-2">{student.points.toLocaleString()} оч.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={student.progress} className="h-1.5 flex-1 bg-clover-100" />
                        <span className="text-xs text-foreground/50 whitespace-nowrap">{student.grade}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-5 bg-clover-600 hover:bg-clover-700 text-white">
                Посмотреть полный рейтинг
              </Button>
            </div>

            {/* Achievements */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Icon name="Award" size={22} className="text-clover-600" />
                <h3 className="font-bold text-lg text-foreground">Значки достижений</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {achievements.map((ach) => (
                  <div
                    key={ach.label}
                    className={`${ach.bg} rounded-2xl p-4 flex flex-col items-center text-center card-hover border border-white shadow-sm`}
                  >
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-3 shadow-sm">
                      <Icon name={ach.icon} size={22} className={ach.color} fallback="Star" />
                    </div>
                    <span className="font-semibold text-sm text-foreground">{ach.label}</span>
                    <span className="text-xs text-foreground/55 mt-1 leading-tight">{ach.desc}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-gradient-to-r from-clover-600 to-clover-500 rounded-3xl p-6 text-white">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-sm opacity-80 mb-1">Твой прогресс до следующего уровня</div>
                    <div className="font-bold text-xl">Серебро → Золото</div>
                  </div>
                  <div className="text-4xl">🌟</div>
                </div>
                <Progress value={65} className="h-2.5 bg-white/20 [&>div]:bg-white" />
                <div className="flex justify-between text-sm opacity-75 mt-2">
                  <span>1 980 очков</span>
                  <span>Осталось 270</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-clover-700 to-clover-600 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-amber-400/10 blur-2xl" />
        </div>
        <div className="max-w-3xl mx-auto px-4 text-center relative">
          <div className="text-5xl mb-6 inline-block animate-float">🍀</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Начни свой путь к знаниям
          </h2>
          <p className="text-white/75 text-lg mb-8 max-w-xl mx-auto">
            Зарегистрируйся бесплатно и прими участие в ближайшей олимпиаде.
            Дипломы, рейтинги и достижения — всё в одном месте!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="bg-white text-clover-700 hover:bg-clover-50 px-8 h-12 font-semibold text-base" onClick={() => navigate("/register")}>
              <Icon name="Sparkles" size={18} className="mr-2" />
              Зарегистрироваться бесплатно
            </Button>

            <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 h-12 text-base">
              Узнать подробнее
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-foreground text-white/70 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🍀</span>
              <div>
                <span className="font-bold text-white text-lg leading-none block">Клевер Маинд</span>
                <span className="text-white/50 text-xs">Образовательная платформа</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {["Олимпиады", "Курсы", "Результаты", "FAQ", "О проекте", "Контакты"].map((link) => (
                <a key={link} href="#" className="hover:text-white transition-colors">
                  {link}
                </a>
              ))}
            </div>
            <div className="text-sm text-white/40">© 2026 Клевер Маинд</div>
          </div>
        </div>
      </footer>
    </div>
  );
}