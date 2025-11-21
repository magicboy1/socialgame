import { motion } from "framer-motion";
import { Shield, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mascot } from "./Mascot";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center p-6 bg-[hsl(var(--teal))]"
      data-testid="welcome-screen"
    >
      <Card className="max-w-3xl w-full p-8 md:p-12 rounded-2xl bg-white border-[10px] border-[hsl(var(--navy))]" style={{ boxShadow: '0 8px 0px hsl(var(--orange-red))' }}>
        <div className="flex flex-col items-center gap-8 text-center">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: 'hsl(var(--navy))', textShadow: '2px 2px 0px rgba(0, 0, 0, 0.2)' }}>
              في أمانتي
            </h1>
            <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: 'hsl(var(--orange-red))', textShadow: '2px 2px 0px rgba(0, 0, 0, 0.2)' }}>
              الأمان السوشيال ميديا
            </h2>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.3,
            }}
          >
            <Mascot size="large" animate={true} />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              كن بطلاً للأمان!
            </h3>

            <p className="text-xl md:text-2xl font-semibold text-muted-foreground max-w-2xl leading-relaxed">
              تعلم كيف تبقى آمناً على الإنترنت من خلال اتخاذ خيارات ذكية حول ما تشاركه ومع من تتحدث.
            </p>

            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 space-y-3">
              <p className="text-lg font-semibold text-foreground flex items-center gap-3 justify-center">
                <Shield className="w-6 h-6 text-primary" />
                أجب عن أسئلة حول الأمان على الإنترنت
              </p>
              <p className="text-lg font-semibold text-foreground flex items-center gap-3 justify-center">
                <Shield className="w-6 h-6 text-primary" />
                تعلم نصائح مهمة للبقاء محمياً
              </p>
              <p className="text-lg font-semibold text-foreground flex items-center gap-3 justify-center">
                <Shield className="w-6 h-6 text-primary" />
                اكسب نجوماً للإجابات الصحيحة
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-full"
          >
            <Button
              onClick={onStart}
              size="lg"
              className="h-20 px-16 text-2xl font-extrabold rounded-xl gap-4 w-full md:w-auto bg-white text-[hsl(var(--navy))] border-[8px] border-[hsl(var(--navy))] hover:bg-[hsl(var(--yellow))]"
              data-testid="button-start-game"
              style={{ boxShadow: '0 6px 0px hsl(var(--orange-red))', textShadow: '2px 2px 0px rgba(0, 0, 0, 0.15)' }}
            >
              <Play className="w-8 h-8 fill-current" />
              ابدأ المغامرة
            </Button>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}
