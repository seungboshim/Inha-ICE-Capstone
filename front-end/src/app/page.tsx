import LoginButtons from "@/components/login/loginButtons";
import LoginInput from "@/components/login/loginInput";

export default function Home() {
  return (
    <div className="mt-20">
      <LoginInput />
      <LoginButtons />
    </div>
  )
}